import {
	View,
	StyleSheet,
	Image,
	useWindowDimensions,
	Text,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { CustomTouchableOpacity } from "components/custom";
import { IconCameraRotate } from "icon/camera";
import {
	Camera,
	CameraProps,
	useCameraDevice,
	useCameraPermission,
} from "react-native-vision-camera";

import Reanimated, {
	Extrapolation,
	interpolate,
	useAnimatedProps,
	useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

Reanimated.addWhitelistedNativeProps({
	zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

const CameraScreen = () => {
	const { colors } = useTheme();
	const { width: screenWidth } = useWindowDimensions();
	const { hasPermission, requestPermission } = useCameraPermission();

	useEffect(() => {
		requestPermission();
	}, []);

	const cameraRef = useRef<Camera>(null);

	const device = useCameraDevice("back", {
		physicalDevices: [
			"ultra-wide-angle-camera",
			"wide-angle-camera",
			"telephoto-camera",
		],
	});

	const zoom = useSharedValue(device ? device.neutralZoom : 1);

	const zoomOffset = useSharedValue(0);
	const gesture = Gesture.Pinch()
		.onBegin(() => {
			zoomOffset.value = zoom.value;
		})
		.onUpdate((event) => {
			const z = zoomOffset.value * event.scale;
			if (device) {
				zoom.value = interpolate(
					z,
					[1, 10],
					[device.minZoom, device.maxZoom],
					Extrapolation.CLAMP
				);
			}
		});

	const animatedProps = useAnimatedProps<CameraProps>(
		() => ({ zoom: zoom.value }),
		[zoom]
	);

	if (!hasPermission) return <Text>No permisson to access camera</Text>;
	if (device == null) return <Text>No devices found</Text>;

	const styles = StyleSheet.create({
		cameraContainer: {
			backgroundColor: "cyan",
			aspectRatio: "9/16",
			borderRadius: 10,
			overflow: "hidden",
			position: "relative",
		},
		cameraFeatureContainer: {
			position: "absolute",
			top: 0,
			left: 0,
			zIndex: 10,
			aspectRatio: "9/16",
			width: screenWidth,
		},
		bottomContainer: {
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingHorizontal: 16,
		},
		leftButtonImage: {
			width: 50,
			aspectRatio: "1/1",
			borderRadius: 8,
		},
		captureButtonContainer: {
			width: 60,
			aspectRatio: "1/1",
			backgroundColor: colors.text,
			borderRadius: 1000,
			alignItems: "center",
			justifyContent: "center",
		},
		captureButtonSpacing: {
			width: 55,
			aspectRatio: "1/1",
			backgroundColor: colors.background,
			borderRadius: 1000,
			alignItems: "center",
			justifyContent: "center",
		},
		captureButton: {
			width: 50,
			aspectRatio: "1/1",
			backgroundColor: colors.text,
			borderRadius: 1000,
		},
	});

	return (
		<>
			<StatusBar style="dark" />
			<SafeAreaView
				style={{ flex: 1, backgroundColor: colors.background }}
			>
				<View style={styles.cameraContainer}>
					{/* camera view  */}
					{/* <Image
						source={{
							uri: "https://images.unsplash.com/photo-1646187548162-6ab403781597?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						}}
						style={{ aspectRatio: "9/16" }}
					/> */}

					{/* camera features overlay  */}
					<GestureDetector gesture={gesture}>
						<ReanimatedCamera
							style={StyleSheet.absoluteFill}
							device={device}
							isActive={true}
							animatedProps={animatedProps}
						/>
					</GestureDetector>
				</View>

				{/* bottom container  */}
				<View style={styles.bottomContainer}>
					{/* left button  */}
					<CustomTouchableOpacity
						style={{ flex: 1, borderRadius: 8, overflow: "hidden" }}
					>
						<Image
							source={{
								uri: "https://images.unsplash.com/photo-1729590637106-f2982a7deabc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
							}}
							style={styles.leftButtonImage}
						/>
					</CustomTouchableOpacity>

					{/* capture button  */}
					<View style={styles.captureButtonContainer}>
						<View style={styles.captureButtonSpacing}>
							<CustomTouchableOpacity
								style={styles.captureButton}
							/>
						</View>
					</View>

					{/* right container  */}
					<View style={{ flex: 1, flexDirection: "row-reverse" }}>
						<CustomTouchableOpacity
							style={{ marginRight: 10, opacity: 0.8 }}
						>
							<IconCameraRotate />
						</CustomTouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</>
	);
};

export default CameraScreen;
