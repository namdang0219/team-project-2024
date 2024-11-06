import useIconGradient from "hook/useIconGradient";
import React from "react";
import Svg, { Path } from "react-native-svg";

const IconImage = ({ gradient }: { gradient: boolean }) => {
	const { SVGGradient, color } = useIconGradient(gradient);

	return (
		<Svg width={28} height={28} viewBox="0 0 32 32">
			{SVGGradient}
			<Path
				fill={color}
				d="M4 22H2V4a2 2 0 0 1 2-2h18v2H4zm17-5a3 3 0 1 0-3-3a3.003 3.003 0 0 0 3 3m0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1"
			></Path>
			<Path
				fill={color}
				d="M28 7H9a2.003 2.003 0 0 0-2 2v19a2.003 2.003 0 0 0 2 2h19a2.003 2.003 0 0 0 2-2V9a2.003 2.003 0 0 0-2-2m0 21H9v-6l4-3.997l5.586 5.586a2 2 0 0 0 2.828 0L23 22.003L28 27Zm0-3.828l-3.586-3.586a2 2 0 0 0-2.828 0L20 22.172l-5.586-5.586a2 2 0 0 0-2.828 0L9 19.172V9h19Z"
			></Path>
		</Svg>
	);
};

export default IconImage;