import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlbumScreen from "screen/app/tabs/album/AlbumScreen";
import ProfileScreen from "screen/app/tabs/profile/ProfileScreen";
import NotificationScreen from "screen/app/tabs/notification/NotificationScreen";

const Stack = createNativeStackNavigator();

const NotificationStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="NotificationScreen"
				component={NotificationScreen}
			/>
		</Stack.Navigator>
	);
};

export default NotificationStack;
