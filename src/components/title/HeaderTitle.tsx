import { TextProps } from "react-native";
import React from "react";
import { ThemedText } from "components/themed";

const HeaderTitle = ({ children, ...props }: TextProps) => {
	return (
		<ThemedText style={{ fontSize: 26, fontWeight: "600" }} {...props}>
			{children}
		</ThemedText>
	);
};

export default HeaderTitle;
