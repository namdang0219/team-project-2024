import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraStack from "./stack/CameraStack";
import MapStack from "./stack/MapStack";
import AlbumStack from "./stack/AlbumStack";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="CameraStack" component={CameraStack} />
			<Tab.Screen name="AlbumStack" component={AlbumStack} />
			<Tab.Screen name="MapStack" component={MapStack} />
		</Tab.Navigator>
	);
};

export default BottomTab;
