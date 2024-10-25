import { useTheme } from "@react-navigation/native";
import React from "react";
import Svg, { Path } from "react-native-svg";

const IconCameraRotate = () => {
	const { colors } = useTheme();

	return (
		<Svg width={40} height={40} viewBox="0 0 256 256">
			<Path
				fill={colors.text}
				d="M208 58h-28.79L165 36.67a6 6 0 0 0-5-2.67H96a6 6 0 0 0-5 2.67L76.78 58H48a22 22 0 0 0-22 22v112a22 22 0 0 0 22 22h160a22 22 0 0 0 22-22V80a22 22 0 0 0-22-22m10 134a10 10 0 0 1-10 10H48a10 10 0 0 1-10-10V80a10 10 0 0 1 10-10h32a6 6 0 0 0 5-2.67L99.21 46h57.57L171 67.33a6 6 0 0 0 5 2.67h32a10 10 0 0 1 10 10Zm-44-96v24a6 6 0 0 1-6 6h-24a6 6 0 0 1 0-12h10l-2-2.09a34.12 34.12 0 0 0-44.38-3.12a6 6 0 1 1-7.22-9.59a46.2 46.2 0 0 1 60.14 4.27a.5.5 0 0 0 .1.1L162 105v-9a6 6 0 0 1 12 0m-17.2 60.4a6 6 0 0 1-1.19 8.4a46.18 46.18 0 0 1-60.14-4.27l-.1-.1L94 159v9a6 6 0 0 1-12 0v-24a6 6 0 0 1 6-6h24a6 6 0 0 1 0 12h-10l2 2.09a34.12 34.12 0 0 0 44.38 3.12a6 6 0 0 1 8.42 1.19"
			></Path>
		</Svg>
	);
};

export default IconCameraRotate;