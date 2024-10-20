import React from "react";
import Svg, { Path } from "react-native-svg";

const IconArrowDown = ({ color = "black" }: { color?: string }) => {
	return (
		<Svg width={28} height={28} viewBox="0 0 24 24">
			<Path
				fill={color}
				fillRule="evenodd"
				d="M16.53 8.97a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L12 12.44l3.47-3.47a.75.75 0 0 1 1.06 0"
				clipRule="evenodd"
			></Path>
		</Svg>
	);
};

export default IconArrowDown;
