import "react-native-reanimated";
import "react-native-gesture-handler";
import { useColorScheme, LogBox, View, Text } from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import RootStack from "./src/routes/RootStack";
import { StatusBar } from "expo-status-bar";
import { darkTheme, lightTheme } from "util/theme/themeColors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableLegacyWebImplementation } from "react-native-gesture-handler";
import ToastManager from "toastify-react-native";
import { Provider } from "react-redux";
import { store } from "store/configureStore";
import { AuthProvider } from "context/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { AlbumsProvider, useAlbum } from "context/album-context";

enableLegacyWebImplementation(true);

const App = () => {
	const scheme = useColorScheme();
	const { colors } = useTheme();

	// LogBox.ignoreLogs([
	// 	"Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
	// 	"@firebase/auth: Auth (11.2.0):",
	// ]);
	LogBox.ignoreAllLogs();
	const [isConnected, setIsConnected] = useState<boolean>(false);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			if (state.isConnected) setIsConnected(state.isConnected);
		});
		// To unsubscribe to these update, just use:
		return unsubscribe();
	}, []);

	// useEffect(() => {
	// 	refreshAlbums();
	// }, []);

	if (!isConnected) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					paddingHorizontal: 50,
				}}
			>
				<Text style={{ color: colors.error, textAlign: "center" }}>
					No internet connection. Please check your connection and try
					again.
				</Text>
			</View>
		);
	}

	return (
		<NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
			<Provider store={store}>
				<CustomProvider>
					{/* <PersistGate loading={null} persistor={persistor}> */}
					<GestureHandlerRootView style={{ flex: 1 }}>
						<ToastManager
							duration={2500}
							showProgressBar={false}
							showCloseIcon={false}
							height={50}
							textStyle={{ fontSize: 16 }}
						/>
						<StatusBar style={scheme ? "dark" : "light"} />

						<RootStack />
					</GestureHandlerRootView>
					{/* </PersistGate> */}
				</CustomProvider>
			</Provider>
		</NavigationContainer>
		// <Test></Test>
	);
};

function CustomProvider({ children }: { children: ReactNode }) {
	return (
		<AuthProvider>
			<AlbumsProvider>{children}</AlbumsProvider>
		</AuthProvider>
	);
}

export default App;
