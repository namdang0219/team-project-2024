import React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconTag = () => {
	return (
		<Svg width={28} height={28} viewBox="0 0 24 24">
			<G
				fill="none"
				stroke="white"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
			>
				<Path d="m17.524 17.524l-2.722 2.723a2.567 2.567 0 0 1-3.634 0L4.13 13.209A3.85 3.85 0 0 1 3 10.487V5.568A2.57 2.57 0 0 1 5.568 3h4.919c1.021 0 2 .407 2.722 1.13l7.038 7.038a2.567 2.567 0 0 1 0 3.634z"></Path>
				<Path d="M9.126 11.694a2.568 2.568 0 1 0 0-5.137a2.568 2.568 0 0 0 0 5.137"></Path>
			</G>
		</Svg>
	);
};

export default IconTag;
