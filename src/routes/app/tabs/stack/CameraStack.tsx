import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditPhotoScreen from "screen/app/tabs/camera/EditPhotoScreen";
import CameraScreen from "screen/app/global/CameraScreen";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const CameraStack = () => {
	const { navigate } = useNavigation<any>();

	useEffect(() => {
		navigate("GlobalStack", { screen: "CameraScreen" });
		// Navigate to CameraScreen when the CameraStack is opened
		// Add your code here to handle navigation when the CameraStack is opened
	});

	return null;

	// return (
	// 	<Stack.Navigator screenOptions={{ headerShown: false }}>
	// 		<Stack.Screen name="EditPhotoScreen" component={EditPhotoScreen} />
	// 	</Stack.Navigator>
	// );
};

export default CameraStack;
