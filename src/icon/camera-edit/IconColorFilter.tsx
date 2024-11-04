import React from "react";
import Svg, { G, Path } from "react-native-svg";
import useIconGradient from "hook/useIconGradient";

const IconColorFilter = ({ gradient }: { gradient: boolean }) => {
	const { SVGGradient, color } = useIconGradient(gradient);

	return (
		<Svg width={28} height={28} viewBox="0 0 24 24">
			{SVGGradient}
			<G
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
			>
				<Path d="M12 14.5a6 6 0 1 0 0-12a6 6 0 0 0 0 12"></Path>
				<Path d="M16 21.5a6 6 0 1 0 0-12a6 6 0 0 0 0 12"></Path>
				<Path d="M8 21.5a6 6 0 1 0 0-12a6 6 0 0 0 0 12"></Path>
			</G>
		</Svg>
	);
};

export default IconColorFilter;
