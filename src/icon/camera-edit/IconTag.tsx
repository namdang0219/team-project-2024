import React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";
import useIconGradient from "hook/useIconGradient";

const IconTag = ({ gradient }: { gradient: boolean }) => {
	const { color, SVGGradient } = useIconGradient(gradient);

	return (
		<Svg width={28} height={28} viewBox="0 0 24 24">
			{SVGGradient}
			<G fill="none">
				<Path
					stroke={color}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M20.162 10.926L13.716 4.48a2.5 2.5 0 0 0-1.767-.732h-5.2a3 3 0 0 0-3 3v5.2a2.5 2.5 0 0 0 .731 1.768l6.445 6.446a4 4 0 0 0 5.657 0l1.79-1.79l1.79-1.79a4 4 0 0 0 0-5.657"
				></Path>
				<Circle
					cx={7.738}
					cy={7.738}
					r={1.277}
					fill={color}
					transform="rotate(-45 7.738 7.738)"
				></Circle>
			</G>
		</Svg>
	);
};

export default IconTag;
