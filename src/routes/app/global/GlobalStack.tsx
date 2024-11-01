import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "screen/app/global/CameraScreen";
import SavePhotoScreen from "screen/app/global/SavePhotoScreen";

const Stack = createNativeStackNavigator();

const GlobalStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="CameraScreen" component={CameraScreen} />
			<Stack.Screen name="SavePhotoScreen" component={SavePhotoScreen} />
		</Stack.Navigator>
	);
};

export default GlobalStack;
