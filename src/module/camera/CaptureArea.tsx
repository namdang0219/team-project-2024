import { View, Text, Image, useWindowDimensions } from "react-native";
import React, { RefObject } from "react";

type CaptureAreaProps = {
	viewRef: RefObject<View>;
	previewPhotoUri: string;
};

const CaptureArea = ({ viewRef, previewPhotoUri }: CaptureAreaProps) => {
	const { width } = useWindowDimensions();
	return (
		<View ref={viewRef}>
			<Image
				source={{
					uri: previewPhotoUri,
				}}
				style={{
					aspectRatio: "9/16",
					width: width,
				}}
			/>
		</View>
	);
};

export default CaptureArea;
