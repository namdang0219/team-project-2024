import { Text, TextProps } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const ThemedText = ({ children, style }: TextProps) => {
	const { colors } = useTheme();

	return <Text style={[{ color: colors.text }, style]}>{children}</Text>;
};

export default ThemedText;
