import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screen/auth/LoginScreen";
import SignupScreen from "../../screen/auth/SignupScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
			<Stack.Screen name="SignupScreen" component={SignupScreen} />
		</Stack.Navigator>
	);
};

export default AuthStack;

// gh repo clone namdang0219/team-project-2024
