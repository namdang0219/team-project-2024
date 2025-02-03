import { View, ActivityIndicator, Dimensions } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const LoadingScreen = () => {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<ActivityIndicator size="large" />
		</View>
	);
};

export default LoadingScreen;
