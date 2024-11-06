import {
	View,
	useWindowDimensions,
	StyleSheet,
	Dimensions,
	ImageBackground,
} from "react-native";
import React, { RefObject } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";

type CaptureAreaProps = {
	viewRef: RefObject<View>;
	previewPhotoUri: string;
	stickers: ISticker[];
};

export interface ISticker {
	source: string;
	id: number;
}

// const CaptureArea = ({
// 	viewRef,
// 	previewPhotoUri,
// 	stickers,
// }: CaptureAreaProps) => {
// 	const { width } = useWindowDimensions();
// 	return (
// 		<View ref={viewRef} style={{ position: "relative", zIndex: 1 }}>
// 			<ImageBackground
// 				source={{
// 					uri: previewPhotoUri,
// 				}}
// 				style={[
// 					{
// 						aspectRatio: "9/16",
// 						width: width,
// 					},
// 				]}
// 			>
// 				{stickers &&
// 					stickers.map((sticker) => (
// 						<Sticker key={sticker.id} source={sticker.source} />
// 					))}
// 			</ImageBackground>
// 		</View>
// 	);
// };

export const Sticker = ({ source }: { source: string }) => {
	const prevScale = useSharedValue(1);
	const scale = useSharedValue(1);
	const prevRotation = useSharedValue(0);
	const rotation = useSharedValue(0);
	const prevTranslateX = useSharedValue(0);
	const translateX = useSharedValue(0);
	const prevTranslateY = useSharedValue(0);
	const translateY = useSharedValue(0);

	const panGesture = Gesture.Pan()
		.minDistance(1)
		.onStart(() => {
			prevTranslateX.value = translateX.value;
			prevTranslateY.value = translateY.value;
		})
		.onUpdate((event) => {
			translateX.value = prevTranslateX.value + event.translationX;
			translateY.value = prevTranslateY.value + event.translationY;
		});

	const pinchGesture = Gesture.Pinch()
		.onUpdate((e) => {
			scale.value = prevScale.value * e.scale;
		})
		.onEnd(() => {
			prevScale.value = scale.value;
		});

	const rotationGesture = Gesture.Rotation()
		.onUpdate((e) => {
			rotation.value = prevRotation.value + e.rotation;
		})
		.onEnd(() => {
			prevRotation.value = rotation.value;
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
			{ scale: scale.value },
			{ rotate: `${rotation.value}rad` },
		],
	}));

	const styles = StyleSheet.create({
		sticker: {
			width: 100,
			height: 100,
			position: "absolute",
			top: Dimensions.get("window").height / 2 - 50,
			left: Dimensions.get("window").width / 2 - 50,
			zIndex: 100000,
		},
	});

	return (
		<GestureDetector
			gesture={Gesture.Simultaneous(
				panGesture,
				pinchGesture,
				rotationGesture
			)}
		>
			<Animated.Image
				source={{ uri: source }}
				style={[styles.sticker, animatedStyle]}
			/>
		</GestureDetector>
	);
};

// export default CaptureArea;
