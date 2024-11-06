import useIconGradient from "hook/useIconGradient";
import React from "react";
import Svg, { Path } from "react-native-svg";

const IconEffect = ({ gradient }: { gradient: boolean }) => {
	const { SVGGradient, color } = useIconGradient(gradient);

	return (
		<Svg width={28} height={28} viewBox="0 0 24 24">
			{SVGGradient}
			<Path
				fill={color}
				fillRule="evenodd"
				d="m3 5l2-2l16 16l-2 2zm10 0l1-2l1 2l2 1l-2 1l-1 2l-1-2l-2-1zM5 15l1-2l1 2l2 1l-2 1l-1 2l-1-2l-2-1zM4 9l1 1l-1 1l-1-1zm14 1l1 1l-1 1l-1-1z"
			></Path>
		</Svg>
	);
};

export default IconEffect;
