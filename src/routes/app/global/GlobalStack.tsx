import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "screen/app/global/CameraScreen";
import SavePhotoScreen from "screen/app/global/SavePhotoScreen";
import AlbumDetailScreen from "screen/app/tabs/album/AlbumDetailScreen";
import AlbumImageListScreen from "screen/app/tabs/album/AlbumImageListScreen";
import AlbumListScreen from "screen/app/tabs/album/AlbumListScreen";
import AlbumTaggedFriend from "screen/app/tabs/album/AlbumTaggedFriend";
import AlbumSearch from "screen/app/tabs/album/AlbumSearch";

const Stack = createNativeStackNavigator();

const GlobalStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="CameraScreen" component={CameraScreen} />
			<Stack.Screen name="SavePhotoScreen" component={SavePhotoScreen} />
			<Stack.Screen
				name="AlbumDetailScreen"
				component={AlbumDetailScreen}
			/>
			<Stack.Screen
				name="AlbumImageListScreen"
				component={AlbumImageListScreen}
			/>
			<Stack.Screen name="AlbumListScreen" component={AlbumListScreen} />
			<Stack.Screen
				name="AlbumTaggedFriend"
				component={AlbumTaggedFriend}
			/>
		</Stack.Navigator>
	);
};

export default GlobalStack;
