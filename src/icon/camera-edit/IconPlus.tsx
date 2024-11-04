import React from "react";
import Svg, { Path } from "react-native-svg";
import useIconGradient from "hook/useIconGradient";

const IconPlus = ({ gradient }: { gradient: boolean }) => {
	const { color, SVGGradient } = useIconGradient(gradient);

	return (
		<Svg width={36} height={36} viewBox="0 0 24 24">
			{SVGGradient}
			<Path
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M12 4.5v15m7.5-7.5h-15"
			></Path>
		</Svg>
	);
};

export default IconPlus;
