import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "screen/app/global/CameraScreen";
import SavePhotoScreen from "screen/app/global/SavePhotoScreen";
import AlbumDetailScreen from "screen/app/tabs/album/AlbumDetailScreen";
import AlbumImageListScreen from "screen/app/tabs/album/AlbumImageListScreen";
import AlbumListScreen from "screen/app/tabs/album/AlbumListScreen";
import AlbumTaggedFriendScreen from "screen/app/tabs/album/AlbumTaggedFriend";
import AlbumWithFriendScreen from "screen/app/tabs/album/AlbumWithFriend";
import FriendListScreen from "screen/app/tabs/album/FriendListScreen";
import ImageViewScreen from "screen/app/tabs/album/ImageViewScreen";

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
			{/* friend list who was tagged in album  */}
			<Stack.Screen
				name="AlbumTaggedFriendScreen"
				component={AlbumTaggedFriendScreen}
			/>
			{/* album with friend  */}
			<Stack.Screen
				name="AlbumWithFriendScreen"
				component={AlbumWithFriendScreen}
			/>
			{/* friend list  */}
			<Stack.Screen
				name="FriendListScreen"
				component={FriendListScreen}
			/>
			{/* image view  */}
			<Stack.Screen
				name="ImageViewScreen"
				component={ImageViewScreen}
				options={{
					presentation: "transparentModal",
					animation: "fade",
				}}
			/>
		</Stack.Navigator>
	);
};

export default GlobalStack;
