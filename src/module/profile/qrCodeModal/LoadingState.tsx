import { View, ActivityIndicator } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const LoadingState = () => {
	const { colors } = useTheme();

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<ActivityIndicator size="small" color={colors.primary} />
		</View>
	);
};

export default LoadingState;
