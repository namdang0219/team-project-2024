import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebaseConfig";
import { clearUser, setUser } from "store/authState/authStateSlice";
import { UserType } from "types/AuthStateType";

const useAuth = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const userData: UserType = {
					uid: user?.uid,
					email: user?.email,
					displayName: user?.displayName as string,
					photoURL: user?.photoURL ?? "",
				};
				dispatch(setUser(userData));
			} else {
				dispatch(clearUser());
			}
		});

		return () => unsubscribe();
	}, [dispatch]);
};

export default useAuth;
