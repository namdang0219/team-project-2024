import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "screen/app/tabs/profile/ProfileScreen";
import SettingScreen from "screen/app/tabs/profile/SettingScreen";
import EditProfileScreen from "screen/app/tabs/profile/EditProfileScreen";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ProfileScreen" component={ProfileScreen} />
			<Stack.Screen name="SettingScreen" component={SettingScreen} />
			<Stack.Screen
				name="EditProfileScreen"
				component={EditProfileScreen}
			/>
		</Stack.Navigator>
	);
};

export default ProfileStack;
