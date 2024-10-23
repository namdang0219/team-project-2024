import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "screen/app/tabs/map/MapScreen";

const Stack = createNativeStackNavigator();

const MapStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="MapScreen" component={MapScreen} />
		</Stack.Navigator>
	);
};

export default MapStack;
