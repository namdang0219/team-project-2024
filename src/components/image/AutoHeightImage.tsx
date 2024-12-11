import React, { useEffect, useState } from "react";
import {
	Dimensions,
	Image,
	ImageRequireSource,
	ImageStyle,
	ImageURISource,
	StyleProp,
} from "react-native";

const { width: screenWidth } = Dimensions.get("screen");

const AutoHeightImage: React.VFC<{
	source: ImageURISource | ImageRequireSource;
	width?: number;
	style?: StyleProp<ImageStyle>;
}> = ({ source, style, width = screenWidth }) => {
	const [height, setHeight] = useState<number>(0);

	useEffect(() => {
		if (typeof source === "number") {
			const originalSize = Image.resolveAssetSource(source);
			const newHeight =
				(width * originalSize.height) / originalSize.width;
			setHeight(newHeight);
		} else if (source?.uri) {
			Image.getSize(source.uri, (originalWidth, originalHeight) => {
				const newHeight = (width * originalHeight) / originalWidth;
				setHeight(newHeight);
			});
		}
	}, [source, width]);

	return (
		<Image
			source={source}
			resizeMode="contain"
			style={[{ height, width }, style]}
		/>
	);
};

export default AutoHeightImage;
