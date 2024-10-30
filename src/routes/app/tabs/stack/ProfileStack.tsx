import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlbumScreen from "screen/app/tabs/album/AlbumScreen";
import ProfileScreen from "screen/app/tabs/profile/ProfileScreen";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ProfileScreen" component={ProfileScreen} />
		</Stack.Navigator>
	);
};

export default ProfileStack;
