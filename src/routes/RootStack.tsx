import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./auth/AuthStack";
import AppStack from "./app/AppStack";

const Stack = createNativeStackNavigator();

const RootStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="AuthStack" component={AuthStack} />
			{/* <Stack.Screen name="AppStack" component={AppStack} /> */}
		</Stack.Navigator>
	);
};

export default RootStack;
