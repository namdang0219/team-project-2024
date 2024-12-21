import { Text, TextProps } from "react-native";
import React, { forwardRef } from "react";
import { useTheme } from "@react-navigation/native";
import Animated from "react-native-reanimated";

const ThemedText = forwardRef<Text, TextProps>(
	({ children, style, ...props }, ref) => {
		const { colors } = useTheme();

		return (
			<Animated.Text
				ref={ref}
				style={[{ color: colors.text }, style]}
				{...props}
			>
				{children}
			</Animated.Text>
		);
	}
);

export default ThemedText;
