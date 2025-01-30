import React from "react";
import { TextProps } from "react-native";
import Svg, { G, Path } from "react-native-svg";

const IconUndo = ({ style, ...props }: TextProps) => {
	return (
		<Svg width={32} height={32} viewBox="0 0 24 24" style={style} {...props}>
			<G
				fill="none"
				stroke="white"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			>
				<Path d="M3 7v6h6"></Path>
				<Path d="M21 17a9 9 0 0 0-9-9a9 9 0 0 0-6 2.3L3 13"></Path>
			</G>
		</Svg>
	);
};

export default IconUndo;
