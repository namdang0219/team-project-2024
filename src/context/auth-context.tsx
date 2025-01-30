import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	User,
} from "firebase/auth";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebaseConfig";
import { Toast } from "toastify-react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { IUser } from "types/IUser";

type AuthContextType = {
	isSignedIn: boolean;
	authLoading: boolean;
	currentUser: User | null;
	remoteUserData: IUser | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	signUp: (
		username: string,
		email: string,
		password: string
	) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
	const [authLoading, setAuthLoading] = useState<boolean>(true);
	const { navigate } = useNavigation<any>();
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [remoteUserData, setRemoteUserData] = useState<IUser | null>(null);

	useEffect(() => {
		async function getRemoteUserData() {
			if (currentUser?.uid)
				try {
					const unsub = onSnapshot(
						doc(db, "0_users", currentUser?.uid),
						(doc) => {
							setRemoteUserData(doc.data() as IUser);
						}
					);
					return unsub;
				} catch (error) {
					console.log(error);
				}
		}
		getRemoteUserData();
	}, [currentUser]);

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				setAuthLoading(true);
				const value = await AsyncStorage.getItem("currentUser");
				if (value != null) {
					setCurrentUser(JSON.parse(value));
					setIsSignedIn(true);
				}
			} catch (error) {
				console.error("Error checking auth status:", error);
				setIsSignedIn(false);
			} finally {
				setAuthLoading(false);
			}
		};

		checkAuthStatus();
	}, []);

	const signUp = async (
		username: string,
		email: string,
		password: string
	) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await updateProfile(userCredential.user, { displayName: username });

			// Add user to database
			const timestamp = Date.now();
			const newUser: IUser = {
				uid: userCredential.user?.uid,
				displayName: username,
				email,
				photoURL: userCredential.user?.photoURL || "",
				albums: [],
				friends: [],
				posts: [],
				create_at: timestamp,
			};
			await setDoc(doc(db, "0_users", userCredential.user?.uid), newUser);

			// Set current user to local storage
			if (userCredential) {
				await AsyncStorage.setItem(
					"currentUser",
					JSON.stringify(auth.currentUser)
				);
				setCurrentUser(userCredential.user);
				setIsSignedIn(true);
			} else {
				setCurrentUser(null);
			}
			navigate("GlobalStack", { screen: "UserInfoScreen" });
		} catch (error: any) {
			if (error.code == "auth/email-already-in-use") {
				Toast.error("メールが登録されています");
			}
			setIsSignedIn(false);
		}
	};

	const login = async (email: string, password: string) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (userCredential) {
				await AsyncStorage.setItem(
					"currentUser",
					JSON.stringify(userCredential.user)
				);
				setCurrentUser(userCredential.user);
				setIsSignedIn(true);
			} else {
				setCurrentUser(null);
				setIsSignedIn(false);
			}
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			await AsyncStorage.removeItem("currentUser");
			setIsSignedIn(false);
			setCurrentUser(null);
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isSignedIn,
				authLoading,
				login,
				logout,
				signUp,
				currentUser,
				remoteUserData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export { useAuth, AuthProvider };
