import { Text, TextProps } from "react-native";
import React from "react";

const ThemedText = ({ children }: TextProps) => {
	return <Text>{children}</Text>;
};

export default ThemedText;
