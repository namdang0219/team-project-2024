import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./auth/AuthStack";
import AppStack from "./app/AppStack";
import GlobalStack from "./app/global/GlobalStack";
import { useAuth } from "context/auth-context";
import LoadingScreen from "screen/app/global/LoadingScreen";

const Stack = createNativeStackNavigator();

const RootStack = () => {
	const { isSignedIn, authLoading } = useAuth();
	const [initializing, setInitializing] = useState<boolean>(true);

	useEffect(() => {
		if (!authLoading) {
			setInitializing(false);
		}
	}, [authLoading]);

	if (authLoading || initializing) {
		return <LoadingScreen />;
	}

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{isSignedIn ? (
				<>
					<Stack.Screen name="AppStack" component={AppStack} />
					<Stack.Screen name="GlobalStack" component={GlobalStack} />
				</>
			) : (
				<Stack.Screen name="AuthStack" component={AuthStack} />
			)}
		</Stack.Navigator>
	);
};

export default RootStack;
