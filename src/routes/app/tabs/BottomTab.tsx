import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraStack from "./stack/CameraStack";
import MapStack from "./stack/MapStack";
import AlbumStack from "./stack/AlbumStack";
import TabBar from "./TabBar";
import NotificationStack from "./stack/NotificationStack";
import ProfileStack from "./stack/ProfileStack";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
	return (
		<Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
			<Tab.Screen
				name="AlbumStack"
				component={AlbumStack}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="MapStack"
				component={MapStack}
				options={{ headerShown: false }}
			/>
			<Tab.Screen name="CameraStack" component={CameraStack} />
			<Tab.Screen
				name="NotificationStack"
				component={NotificationStack}
			/>
			<Tab.Screen
				name="ProfileStack"
				component={ProfileStack}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
};

export default BottomTab;
