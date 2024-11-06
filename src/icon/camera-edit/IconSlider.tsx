import React from "react";
import Svg, { Path } from "react-native-svg";
import useIconGradient from "hook/useIconGradient";

const IconSlider = ({ gradient }: { gradient: boolean }) => {
	const { SVGGradient, color } = useIconGradient(gradient);

	return (
		<Svg width={24} height={24} viewBox="0 0 16 16">
			{SVGGradient}
			<Path
				fill={color}
				fillRule="evenodd"
				d="M11.5 2a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"
			></Path>
		</Svg>
	);
};

export default IconSlider;