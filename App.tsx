import 'react-native-reanimated'
import "react-native-gesture-handler";
import {
	useColorScheme,
	LogBox,
	View,
	Text,
	useWindowDimensions,
} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/routes/RootStack";
import { StatusBar } from "expo-status-bar";
import { darkTheme, lightTheme } from "util/theme/themeColors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableLegacyWebImplementation } from "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";

enableLegacyWebImplementation(true);

const App = () => {
	const scheme = useColorScheme();
	LogBox.ignoreLogs([
		"Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
	]);

	const { width } = useWindowDimensions();

	return (
		<>
			<ToastProvider
				placement="top"
				duration={4000}
				animationType="slide-in"
				animationDuration={400}
				successColor="green"
				dangerColor="red"
				warningColor="orange"
				normalColor="gray"
				textStyle={{ fontSize: 20 }}
				offset={50}
				offsetTop={30}
				offsetBottom={40}
				renderType={{
					custom_type: (toast) => (
						<View
							style={{
								width: (width / 5) * 3,
								shadowColor: "#000",
								shadowOffset: { width: 0, height: 5 },
								shadowOpacity: 0.05,
								shadowRadius: 3,
								elevation: 3,
								backgroundColor: "white",
								borderRadius: 1000,
								height: 50,
								flexDirection: "row",
								borderWidth: 1,
								borderColor: "#f1f5f9",
							}}
						>
							<View
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Text
									style={{ fontSize: 16, color: "#000000" }}
								>
									{toast.message}
								</Text>
							</View>
						</View>
					),
				}}
			>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<StatusBar style={scheme ? "dark" : "light"} />
					<NavigationContainer
						theme={scheme === "dark" ? darkTheme : lightTheme}
					>
						<RootStack />
					</NavigationContainer>
				</GestureHandlerRootView>
			</ToastProvider>
		</>
	);
};

export default App;
