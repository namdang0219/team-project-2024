import { View, Text, TextProps } from "react-native";
import React from "react";
import { ThemedText } from "components/themed";

const TitleAuth = ({ children, style }: TextProps) => {
	return (
		<ThemedText
			style={[
				{
					fontSize: 32,
					fontWeight: "600",
					marginTop: 30,
					textAlign: "center",
				},
				style,
			]}
		>
			{children}
		</ThemedText>
	);
};

export default TitleAuth;
