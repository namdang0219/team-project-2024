import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebaseConfig";
import { clearUser, setUser } from "store/authState/authStateSlice";
import { AuthStateType } from "types/AuthStateType";

const useAuth = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const userId: AuthStateType["userId"] = user.uid;
				dispatch(setUser(userId));
			} else {
				dispatch(clearUser());
			}
		});

		return () => unsubscribe();
	}, [dispatch]);
};

export default useAuth;
