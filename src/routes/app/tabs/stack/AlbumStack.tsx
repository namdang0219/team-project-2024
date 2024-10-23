import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlbumScreen from "screen/app/tabs/album/AlbumScreen";

const Stack = createNativeStackNavigator();

const AlbumStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AlbumScreen" component={AlbumScreen}/>
		</Stack.Navigator>
	);
};

export default AlbumStack;