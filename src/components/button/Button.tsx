import { Text, TouchableOpacityProps } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { CustomTouchableOpacity } from "components/custom";

const Button = ({ children, style, ...props }: TouchableOpacityProps) => {
	const { colors } = useTheme();

	return (
		<CustomTouchableOpacity
			style={[
				{
					alignItems: "center",
					justifyContent: "center",
					height: 50,
					backgroundColor: colors.primary,
					borderRadius: 1000,
					position: "relative",
				},
				style,
			]}
			{...props}
		>
			{typeof children === "string" ? (
				<Text
					style={{
						fontSize: 16,
						fontWeight: "600",
						color: "white",
					}}
				>
					{children}
				</Text>
			) : (
				children
			)}
		</CustomTouchableOpacity>
	);
};

export default Button;
