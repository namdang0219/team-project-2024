import { ActivityIndicator, Text, TouchableOpacityProps } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { CustomTouchableOpacity } from "components/custom";

const Button = ({
	children,
	loading = false,
	style,
	...props
}: TouchableOpacityProps & { loading?: boolean }) => {
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
			{!loading &&
				(typeof children === "string" ? (
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
				))}
			{loading && <ActivityIndicator size={"small"} />}
		</CustomTouchableOpacity>
	);
};

export default Button;
