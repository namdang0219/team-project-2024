import React from "react";
import { getColors } from 'react-native-image-colors';

export function useImageColors(url: string) {
	const [colors, setColors] = React.useState<any>(null);

	React.useEffect(() => {
		getColors(url, {
			fallback: "#228B22",
			cache: true,
			key: url,
		}).then(setColors);
	}, []);

	return colors;
}
