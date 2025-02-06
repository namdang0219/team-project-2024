import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./tabs/BottomTab";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const AppStack = () => {
	// useEffect(() => {
	// 	AsyncStorage.clear();
	// });

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="BottomTab" component={BottomTab} />
		</Stack.Navigator>
	);
};

export default AppStack;
