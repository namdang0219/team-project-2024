import React, {
	useEffect,
	useState,
	forwardRef,
	useImperativeHandle,
} from "react";
import {
	Dimensions,
	Image,
	ImageRequireSource,
	ImageStyle,
	ImageURISource,
	StyleProp,
} from "react-native";

const { width: screenWidth } = Dimensions.get("screen");

const AutoHeightImage = forwardRef(
	(
		{
			source,
			style,
			width = screenWidth,
			...props
		}: {
			source: ImageURISource | ImageRequireSource;
			width?: number;
			style?: StyleProp<ImageStyle>;
		},
		ref
	) => {
		const [height, setHeight] = useState<number>(0);

		//   useImperativeHandle(ref, () => ({
		//     getHeight: () => height,
		//     setNewWidth: (newWidth: number) => {
		//       if (typeof source === "number") {
		//         const originalSize = Image.resolveAssetSource(source);
		//         const newHeight = (newWidth * originalSize.height) / originalSize.width;
		//         setHeight(newHeight);
		//       } else if (source?.uri) {
		//         Image.getSize(source.uri, (originalWidth, originalHeight) => {
		//           const newHeight = (newWidth * originalHeight) / originalWidth;
		//           setHeight(newHeight);
		//         });
		//       }
		//     },
		//   }));

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
				{...props}
			/>
		);
	}
);

export default AutoHeightImage;
