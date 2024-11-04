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
								width: (width / 5) * 4,
								shadowColor: "#000",
								shadowOffset: { width: 0, height: 5 },
								shadowOpacity: 0.1,
								shadowRadius: 5,
								elevation: 3,
								backgroundColor: "white",
								borderRadius: 10,
								height: 50,
								flexDirection: "row",
								borderWidth: 1,
								borderColor: "#f1f5f9",
							}}
						>
							<View
								style={{
									width: 5,
									backgroundColor: toast.successColor,
									height: 50,
									borderTopLeftRadius: 10,
									borderBottomLeftRadius: 10,
								}}
							/>
							<View
								style={{
									flex: 1,
									justifyContent: "center",
									paddingHorizontal: 10,
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
