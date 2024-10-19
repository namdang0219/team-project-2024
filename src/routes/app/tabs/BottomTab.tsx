import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AlbumScreen from "screen/app/tabs/album/AlbumScreen";
import MapScreen from "screen/app/tabs/map/MapScreen";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="AlbumScreen" component={AlbumScreen} />
			<Tab.Screen name="MapScreen" component={MapScreen} />
		</Tab.Navigator>
	);
};

export default BottomTab;
