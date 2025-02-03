import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./auth/AuthStack";
import AppStack from "./app/AppStack";
import GlobalStack from "./app/global/GlobalStack";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import LoadingScreen from "screen/app/global/LoadingScreen";
import useAuth from "hook/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const Stack = createNativeStackNavigator();

const RootStack = () => {
	useAuth();
	const { loading, isLoggedIn } = useSelector(
		(state: RootState) => state.authState
	);

	const [initializing, setInitializing] = useState<boolean>(true);

	useEffect(() => {
		if (!loading) {
			setInitializing(false);
		}
	}, [loading]);

	if (loading || initializing) {
		return <LoadingScreen></LoadingScreen>;
	}

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{!isLoggedIn ? (
				<Stack.Screen name="AuthStack" component={AuthStack} />
			) : (
				<>
					<Stack.Screen name="AppStack" component={AppStack} />
					<Stack.Screen name="GlobalStack" component={GlobalStack} />
				</>
			)}
		</Stack.Navigator>
	);
};

export default RootStack;
