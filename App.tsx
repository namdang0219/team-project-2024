import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/routes/RootStack";

const App = () => {
	return (
		<NavigationContainer>
			<RootStack />
		</NavigationContainer>
	);
};

export default App;
