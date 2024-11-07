import React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconRedo = () => {
	return (
		<Svg width={32} height={32} viewBox="0 0 24 24">
			<G
				fill="none"
				stroke="white"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			>
				<Path d="M21 7v6h-6"></Path>
				<Path d="M3 17a9 9 0 0 1 9-9a9 9 0 0 1 6 2.3l3 2.7"></Path>
			</G>
		</Svg>
	);
};

export default IconRedo;
