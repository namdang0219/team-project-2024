import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
} from "firebase/auth";
import { AuthStateType } from "types/AuthStateType";
import { auth, db } from "../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { UserDataType } from "types/UserType";

const initialState: AuthStateType = {
	userId: "",
	loading: false,
	isLoggedIn: false,
};

// ✅ Signup
export const signup = createAsyncThunk<
	AuthStateType["userId"],
	{ email: string; password: string; username: string },
	{ rejectValue: string }
>(
	"authState/signup",
	async ({ email, password, username }, { rejectWithValue }) => {
		try {
			const userCre = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (userCre) {
				const user = userCre.user;
				await updateProfile(user, { displayName: username });

				// Create user in Firestore
				const newUser: UserDataType = {
					uid: user.uid,
					displayName: user.displayName ?? "",
					email: user.email ?? "",
					photoURL: user.photoURL ?? "",
					friends: [],
					favorites: [],
					posts: [],
					create_at: Date.now(),
				};
				await setDoc(doc(db, "00_users", user.uid), newUser);

				return user.uid;
			}
			throw new Error("User creation failed");
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

// ✅ Login
export const login = createAsyncThunk<
	AuthStateType["userId"],
	{ email: string; password: string },
	{ rejectValue: string }
>("authState/login", async ({ email, password }, { rejectWithValue }) => {
	try {
		const userCre = await signInWithEmailAndPassword(auth, email, password);
		if (userCre) {
			const user = userCre.user;
			return user.uid;
		}
		throw new Error("Login failed");
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});

// ✅ Signout
export const signout = createAsyncThunk<void, void, { rejectValue: string }>(
	"authState/signout",
	async (_, { rejectWithValue }) => {
		try {
			await signOut(auth);
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

const authStateSlice = createSlice({
	name: "authState",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<AuthStateType["userId"]>) => {
			state.userId = action.payload;
			state.isLoggedIn = !!action.payload;
		},
		clearUser: (state) => {
			state.userId = "";
			state.isLoggedIn = false;
		},
	},
	extraReducers: (builder) => {
		// ✅ Signup
		builder.addCase(signup.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(signup.fulfilled, (state, action) => {
			state.userId = action.payload;
			state.loading = false;
			state.isLoggedIn = true;
		});
		builder.addCase(signup.rejected, (state, action) => {
			state.loading = false;
			state.isLoggedIn = false;
			console.error("Signup failed:", action.payload);
		});

		// ✅ Login
		builder.addCase(login.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.userId = action.payload;
			state.loading = false;
			state.isLoggedIn = true;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loading = false;
			state.isLoggedIn = false;
		});

		// ✅ Signout
		builder.addCase(signout.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(signout.fulfilled, (state) => {
			state.userId = "";
			state.loading = false;
			state.isLoggedIn = false;
		});
		builder.addCase(signout.rejected, (state) => {
			state.loading = false;
		});
	},
});

export const { clearUser, setUser } = authStateSlice.actions;
export default authStateSlice.reducer;
