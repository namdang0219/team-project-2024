import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

const IconBack = ({ color = "white" }: { color?: string }) => {
	return (
		<Svg width={14} height={28} viewBox="0 0 12 24">
			<Path
				fill={color}
				fillRule="evenodd"
				d="M10 19.438L8.955 20.5l-7.666-7.79a1.02 1.02 0 0 1 0-1.42L8.955 3.5L10 4.563L2.682 12z"
			></Path>
		</Svg>
	);
};

export default IconBack;
