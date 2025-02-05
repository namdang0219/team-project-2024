import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserData } from "store/user/userSlice";
import { RootState } from "store/configureStore";

const useSyncWithFirebase = () => {
	const userData = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener(async (state) => {
			if (state.isConnected) return; // if true, use data from firebase

			console.log("No internet connection, use data from storage");

			try {
				const storedData = await AsyncStorage.getItem("persist:root");
				if (!storedData) return;

				const { user } = JSON.parse(storedData); // parse
				if (!user) return;

				dispatch(setUserData(JSON.parse(user))); // update offline user to redux store
			} catch (error) {
				console.error("Get offline data:", error);
			}
		});

		return () => unsubscribe();
	}, []);
};

export default useSyncWithFirebase;
