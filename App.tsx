import { View, Text, useColorScheme, LogBox } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/routes/RootStack";
import { StatusBar } from "expo-status-bar";
import { darkTheme, lightTheme } from "util/theme/themeColors";

const App = () => {
	const scheme = useColorScheme();
	LogBox.ignoreLogs([
		"Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
	]);

	return (
		<>
			<StatusBar style={scheme ? "dark" : "light"} />
			<NavigationContainer
				theme={scheme === "dark" ? darkTheme : lightTheme}
			>
				<RootStack />
			</NavigationContainer>
		</>
	);
};

export default App;
