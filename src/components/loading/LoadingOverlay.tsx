import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import Animated, {
	BounceIn,
	Easing,
	FadeIn,
	FadeOut,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";

const LoadingOverlay = () => {
	const { width, height } = useWindowDimensions();

	// Pulsing anim
	const scale = useSharedValue(1);

	React.useEffect(() => {
		scale.value = withRepeat(
			withSequence(
				withTiming(1.2, { duration: 500, easing: Easing.ease }),
				withTiming(1, { duration: 500, easing: Easing.ease })
			),
			-1,
			true
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));
	return (
		<Animated.View
			entering={FadeIn}
			exiting={FadeOut}
			style={{
				position: "absolute",
				width,
				height,
				backgroundColor: "#0000004D",
				zIndex: 10000,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<View
				style={{
					backgroundColor: "white",
					width: 90,
					height: 90,
					borderRadius: 10,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Animated.Image
					source={require("../../../assets/img/loadingOverlayIcon.png")}
					style={[{ width: 60, height: 60 }, animatedStyle]}
				/>
			</View>
		</Animated.View>
	);
};

export default LoadingOverlay;
