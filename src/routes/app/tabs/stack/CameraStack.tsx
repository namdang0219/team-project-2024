import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditPhotoScreen from "screen/app/tabs/camera/EditPhotoScreen";

const Stack = createNativeStackNavigator();

const CameraStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="EditPhotoScreen" component={EditPhotoScreen} />
		</Stack.Navigator>
	);
};

export default CameraStack;
