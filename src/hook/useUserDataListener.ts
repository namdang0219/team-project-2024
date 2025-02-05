import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "store/user/userSlice";
import { db } from "../../firebaseConfig";
import { AppDispatch } from "store/configureStore";

const useUserDataListener = (userId: string) => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!userId) return;
		const unsubscribe = onSnapshot(doc(db, "00_users", userId), (doc) => {
			if (doc.exists()) {
				const userData = doc.data();
				dispatch(setUserData(userData));
			}
		});

		return () => unsubscribe();
	}, [userId]);
};

export default useUserDataListener;
