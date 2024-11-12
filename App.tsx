import "react-native-reanimated";
import "react-native-gesture-handler";
import { useColorScheme, LogBox } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/routes/RootStack";
import { StatusBar } from "expo-status-bar";
import { darkTheme, lightTheme } from "util/theme/themeColors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableLegacyWebImplementation } from "react-native-gesture-handler";
import ToastManager from "toastify-react-native";
import { Provider } from "react-redux";
import { persistor, store } from "store/configureStore";
import { PersistGate } from "redux-persist/integration/react";

enableLegacyWebImplementation(true);

const App = () => {
	const scheme = useColorScheme();
	LogBox.ignoreLogs([
		"Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
	]);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<ToastManager
						duration={2500}
						showProgressBar={false}
						showCloseIcon={false}
						height={50}
						textStyle={{ fontSize: 16 }}
					/>
					<StatusBar style={scheme ? "dark" : "light"} />
					<NavigationContainer
						theme={scheme === "dark" ? darkTheme : lightTheme}
					>
						<RootStack />
					</NavigationContainer>
				</GestureHandlerRootView>
			</PersistGate>
		</Provider>
	);
};

export default App;
