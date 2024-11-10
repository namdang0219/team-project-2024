import { Text, TextProps } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const Label = ({ children, style }: TextProps) => {
	const { colors } = useTheme();

	return (
		<Text
			style={[
				{
					color: colors.primary,
					fontWeight: "600",
					fontSize: 16,
					marginBottom: 8,
                    marginLeft: 4
				},
				style,
			]}
		>
			{children}
		</Text>
	);
};

export default Label;
