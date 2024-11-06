import useIconGradient from "hook/useIconGradient";
import React from "react";
import Svg, { Path } from "react-native-svg";

const IconText = ({ gradient }: { gradient: boolean }) => {
	const { SVGGradient, color } = useIconGradient(gradient);

	return (
		<Svg width={28} height={28} viewBox="0 0 24 24">
			{SVGGradient}
			<Path
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M3 7V5h14v2m-7-2v14m0 0h2m-2 0H8m5-5v-2h8v2m-4-2v7m0 0h-1.5m1.5 0h1.5"
			></Path>
		</Svg>
	);
};

export default IconText;
