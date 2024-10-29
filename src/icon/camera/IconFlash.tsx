import React from "react";
import { Ionicons } from "@expo/vector-icons";
import useIconGradient from "hook/useIconGradient";
import Svg, { Path } from "react-native-svg";

const IconFlash = ({ gradient }: { gradient: boolean }) => {
	const { SVGGradient, color } = useIconGradient(gradient);
	return (
		<Svg width={28} height={28} viewBox="0 0 32 32">
			{SVGGradient}
			<Path
				fill={color}
				d="M11.61 29.92a1 1 0 0 1-.6-1.07L12.83 17H8a1 1 0 0 1-1-1.23l3-13A1 1 0 0 1 11 2h10a1 1 0 0 1 .78.37a1 1 0 0 1 .2.85L20.25 11H25a1 1 0 0 1 .9.56a1 1 0 0 1-.11 1l-13 17A1 1 0 0 1 12 30a1.1 1.1 0 0 1-.39-.08"
			></Path>
		</Svg>
	);
};

export default IconFlash;
