import useIconGradient from "hook/useIconGradient";
import React from "react";
import Svg, { Path } from "react-native-svg";

const IconGrid = ({ gradient }: { gradient: boolean }) => {
	const { color, SVGGradient } = useIconGradient(gradient);
	return (
		<Svg width={34} height={34} viewBox="0 0 21 21">
			{SVGGradient}
			<Path
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6.5 4v14m8-14v14M3.5 7h14m-14 8h14"
			></Path>
		</Svg>
	);
};

export default IconGrid;
