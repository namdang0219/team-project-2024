import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "screen/auth/LoginScreen";
import SignupScreen from "screen/auth/SignupScreen";
import IntroduceScreen from "screen/auth/IntroduceScreen";
import FindAccountScreen from "screen/auth/FindAccountScreen";
import VerifyCodeScreen from "screen/auth/VerifyCodeScreen";
import UserInfoScreen from "screen/auth/UserInfoScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="IntroduceScreen" component={IntroduceScreen} />
			<Stack.Screen name="SignupScreen" component={SignupScreen} />
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
			<Stack.Screen
				name="FindAccountScreen"
				component={FindAccountScreen}
			/>
			<Stack.Screen
				name="VerifyCodeScreen"
				component={VerifyCodeScreen}
			/>
			<Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
		</Stack.Navigator>
	);
};

export default AuthStack;