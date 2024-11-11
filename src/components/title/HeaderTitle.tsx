import { Text, TextProps } from "react-native";
import React from "react";

const HeaderTitle = ({ children, ...props }: TextProps) => {
	return (
		<Text style={{ fontSize: 26, fontWeight: "600" }} {...props}>
			{children}
		</Text>
	);
};

export default HeaderTitle;
