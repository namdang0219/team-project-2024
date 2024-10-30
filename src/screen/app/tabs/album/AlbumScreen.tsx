import { View, Text } from "react-native";
import React from "react";

const AlbumScreen = () => {
	return <App />;
};

import Animated, {
	useSharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from "react-native-gesture-handler";
import { StyleSheet, Dimensions } from "react-native";

function clamp(val: number, min: number, max: number) {
	return Math.min(Math.max(val, min), max);
}

const { width, height } = Dimensions.get("screen");

function App() {
	const translationX = useSharedValue(0);
	const translationY = useSharedValue(0);
	const prevTranslationX = useSharedValue(0);
	const prevTranslationY = useSharedValue(0);

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translationX.value },
			{ translateY: translationY.value },
		],
	}));

	const pan = Gesture.Pan()
		.minDistance(1)
		.onStart(() => {
			prevTranslationX.value = translationX.value;
			prevTranslationY.value = translationY.value;
		})
		.onUpdate((event) => {
			const maxTranslateX = width / 2 - 50;
			const maxTranslateY = height / 2 - 50;

			translationX.value = clamp(
				prevTranslationX.value + event.translationX,
				-maxTranslateX,
				maxTranslateX
			);
			translationY.value = clamp(
				prevTranslationY.value + event.translationY,
				-maxTranslateY,
				maxTranslateY
			);
		})
		.runOnJS(true);

	return (
		<GestureHandlerRootView style={styles.container}>
			<GestureDetector gesture={pan}>
				<Animated.View
					style={[animatedStyles, styles.box]}
				></Animated.View>
			</GestureDetector>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	box: {
		width: 100,
		height: 100,
		backgroundColor: "#b58df1",
		borderRadius: 20,
	},
});

export default AlbumScreen;
