import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "screen/app/tabs/camera/CameraScreen";

const Stack = createNativeStackNavigator();

const CameraStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CameraScreen" component={CameraScreen}/>
		</Stack.Navigator>
	);
};

export default CameraStack;