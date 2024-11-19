import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlbumScreen from "screen/app/tabs/album/AlbumScreen";
import AlbumDetailScreen from "screen/app/tabs/album/AlbumDetailScreen";

const Stack = createNativeStackNavigator();

const AlbumStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="AlbumScreen"
				component={AlbumScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="AlbumDetailScreen"
				component={AlbumDetailScreen}
				options={{ headerShown: false }}

			/>
		</Stack.Navigator>
	);
};

export default AlbumStack;
