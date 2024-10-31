import useIconGradient from "hook/useIconGradient";
import React from "react";
import Svg, { Path } from "react-native-svg";

const IconRotate = ({ gradient }: { gradient: boolean }) => {
	const { SVGGradient, color } = useIconGradient(gradient);
	return (
		<Svg width={28} height={28} viewBox="0 0 16 16">
			{SVGGradient}
			<Path
				fill={color}
				fillRule="evenodd"
				d="M8 1.5a6.5 6.5 0 0 0-6.445 5.649a.75.75 0 1 0 1.488.194A5.001 5.001 0 0 1 11.57 4.5h-1.32a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-1.5 0v1.06A6.48 6.48 0 0 0 8 1.5m-5.25 13a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5H4.43a5.001 5.001 0 0 0 8.528-2.843a.75.75 0 1 1 1.487.194A6.501 6.501 0 0 1 3.5 12.691v1.059a.75.75 0 0 1-.75.75"
				clipRule="evenodd"
			></Path>
		</Svg>
	);
};

export default IconRotate;