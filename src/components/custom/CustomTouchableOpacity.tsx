import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";

const CustomTouchableOpacity = ({
	children,
	style,
	...props
}: TouchableOpacityProps) => {
	return (
		<TouchableOpacity activeOpacity={0.75} style={[{}, style]} {...props}>
			{children}
		</TouchableOpacity>
	);
};

export default CustomTouchableOpacity;
