import { View, ViewProps } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

export default function ThemedView({ children, style }: ViewProps) {
	const { colors } = useTheme();

	return (
		<View style={[{ backgroundColor: colors.background }, style]}>
			{children}
		</View>
	);
}
