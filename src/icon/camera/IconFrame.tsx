import useIconGradient from "hook/useIconGradient";
import React from "react";
import Svg, { Path } from "react-native-svg";

const IconFrame = ({ gradient }: { gradient: boolean }) => {
	const { color, SVGGradient } = useIconGradient(gradient);
	return (
		<Svg width={28} height={28} viewBox="0 0 24 24">
			{SVGGradient}
			<Path fill={color} d="M2 3h20v18H2zm18 16V7H4v12z"></Path>
		</Svg>
	);
};

export default IconFrame;
