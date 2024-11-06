import useIconGradient from "hook/useIconGradient";
import React from "react";
import Svg, { Ellipse, G, Path } from "react-native-svg";

const IconSticker = ({ gradient }: { gradient: boolean }) => {
	const { SVGGradient, color } = useIconGradient(gradient);

	return (
		<Svg width={28} height={28} viewBox="0 0 24 24">
			{SVGGradient}
			<G fill="none">
				<Path
					stroke={color}
					strokeWidth={1.5}
					d="M2 12c0 5.523 4.477 10 10 10c.648 0 1.25-.3 1.708-.758l7.534-7.534C21.7 13.25 22 12.648 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12Z"
				></Path>
				<Path
					stroke={color}
					strokeLinecap="round"
					strokeWidth={1.5}
					d="M8.913 15.934a8.1 8.1 0 0 0 3.356.1"
				></Path>
				<Ellipse
					cx={14.509}
					cy={9.774}
					fill={color}
					rx={1}
					ry={1.5}
					transform="rotate(-15 14.51 9.774)"
				></Ellipse>
				<Ellipse
					cx={8.714}
					cy={11.328}
					fill={color}
					rx={1}
					ry={1.5}
					transform="rotate(-15 8.714 11.328)"
				></Ellipse>
				<Path
					stroke={color}
					strokeWidth={1.5}
					d="M12 22c0-2.793 0-4.19.393-5.312a7 7 0 0 1 4.295-4.295C17.811 12 19.208 12 22 12"
				></Path>
			</G>
		</Svg>
	);
};

export default IconSticker;
