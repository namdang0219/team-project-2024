import {
	View,
	Text,
	Animated as RNAnimated,
	useWindowDimensions,
	StyleSheet,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

type ExposureSliderProps = {
	showExposureSlider: boolean;
	exposureValue: number;
	setExposureValue: (value: number) => void;
};

function clamp(val: number, min: number, max: number) {
	return Math.min(Math.max(val, min), max);
}

const ExposureSlider = ({
	showExposureSlider,
	exposureValue,
	setExposureValue,
}: ExposureSliderProps) => {
	const { width } = useWindowDimensions();

	const translationX = useSharedValue(0);
	const prevTranslationX = useSharedValue(0);

	const fadeAnim = useRef(new RNAnimated.Value(0)).current;
	const translateYAnim = useRef(new RNAnimated.Value(20)).current;

	const exposureAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translationX.value }],
	}));

	const slidePan = Gesture.Pan()
		.minDistance(1)
		.onStart(() => {
			prevTranslationX.value = translationX.value;
		})
		.onUpdate((event) => {
			const maxTranslateX = width / 3;

			setExposureValue(
				Math.floor((translationX.value * 50) / (width / 6))
			); // update exposure value to ui

			translationX.value = clamp(
				prevTranslationX.value + event.translationX,
				-maxTranslateX,
				maxTranslateX
			);
		})
		.runOnJS(true);

	useEffect(() => {
		if (showExposureSlider) {
			RNAnimated.parallel([
				RNAnimated.timing(fadeAnim, {
					toValue: 1,
					duration: 100,
					useNativeDriver: true,
				}),
				RNAnimated.timing(translateYAnim, {
					toValue: 0,
					duration: 100,
					useNativeDriver: true,
				}),
			]).start();
		} else {
			RNAnimated.parallel([
				RNAnimated.timing(translateYAnim, {
					toValue: 20,
					duration: 100,
					useNativeDriver: true,
				}),
				RNAnimated.timing(fadeAnim, {
					toValue: 0,
					duration: 100,
					useNativeDriver: true,
				}),
			]).start();
		}
	}, [showExposureSlider]);

	return (
		<RNAnimated.View
			style={[
				{
					position: "absolute",
					bottom: 80,
					width: width,
					alignItems: "center",
					justifyContent: "center",
				},
				{
					opacity: fadeAnim,
					transform: [
						{
							translateY: translateYAnim,
						},
					],
				},
			]}
		>
			{/* indicator */}
			<View style={styles.exposureIndicator} />

			{/* exposure slides  */}
			<GestureDetector gesture={slidePan}>
				<Animated.View
					style={[
						{
							flexDirection: "row",
							alignItems: "center",
							width: (width / 3) * 2,
							justifyContent: "space-between",
							paddingVertical: 5,
						},
						exposureAnimatedStyle,
					]}
				>
					{Array(41)
						.fill(null)
						.map((_, index) => (
							<View
								key={index}
								style={{
									height: [1, 41, 21].includes(index + 1)
										? 12
										: 6,
									width: 1,
									backgroundColor: "yellow",
								}}
							></View>
						))}
				</Animated.View>
			</GestureDetector>

			{/* exposure value  */}
			<Text style={styles.exposureValue}>{exposureValue * -1}</Text>
		</RNAnimated.View>
	);
};

const styles = StyleSheet.create({
	exposureIndicator: {
		borderTopWidth: 10,
		borderRightWidth: 6,
		borderLeftWidth: 6,
		borderTopColor: "yellow",
		borderRightColor: "transparent",
		borderLeftColor: "transparent",
		width: 0,
		marginHorizontal: "auto",
		justifyContent: "center",
	},
	exposureValue: {
		color: "yellow",
		width: 40,
		textAlign: "center",
		marginHorizontal: "auto",
	},
});

export default ExposureSlider;
