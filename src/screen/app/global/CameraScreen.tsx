import {
	View,
	StyleSheet,
	Image,
	useWindowDimensions,
	Text,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { CustomTouchableOpacity } from "components/custom";
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
import { darkTheme } from "util/theme/themeColors";
import {
	Feather,
	MaterialCommunityIcons,
	Ionicons,
	MaterialIcons,
} from "@expo/vector-icons";
import {
	IconExposure,
	IconFlash,
	IconFrame,
	IconGrid,
	IconRotate,
} from "icon/camera";

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
	if (!device == null)
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>No devices found</Text>
			</View>
		);

	const styles = StyleSheet.create({
		cameraContainer: {
			backgroundColor: darkTheme.colors.background,
			aspectRatio: "9/16",
			borderRadius: 10,
			overflow: "hidden",
			position: "relative",
			alignItems: "center",
			justifyContent: "center",
		},
		cameraFeatureContainer: {
			position: "absolute",
			top: 0,
			left: 0,
			zIndex: 10,
			aspectRatio: "9/16",
			width: screenWidth,
		},
		primaryShadow: {
			shadowRadius: 8,
			shadowOpacity: 0.6,
		},
		featureItem: {
			width: 40,
			alignItems: "center",
			justifyContent: "center",
		},
	});

	return (
		<>
			<StatusBar style="light" />
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: darkTheme.colors.background,
				}}
			>
				<View style={styles.cameraContainer}>
					{/* camera view  */}
					<Image
						source={{
							uri: "https://i.pinimg.com/564x/35/82/60/3582606724d54222c0052990da2c1f0f.jpg",
						}}
						style={{ aspectRatio: "9/16", width: screenWidth }}
					/>

					<View style={styles.cameraFeatureContainer}>
						<View style={{ position: "relative", flex: 1 }}>
							{/* top container  */}
							<View
								style={{
									height: 50,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									paddingHorizontal: 10,
								}}
							>
								{/* x mark  */}
								<CustomTouchableOpacity>
									<Feather
										name="x"
										size={30}
										color={"white"}
										style={styles.primaryShadow}
									/>
								</CustomTouchableOpacity>
								{/* image flip  */}
								<CustomTouchableOpacity>
									<MaterialCommunityIcons
										name="flip-horizontal"
										size={26}
										color={"white"}
										style={styles.primaryShadow}
									/>
								</CustomTouchableOpacity>
								{/* save button  */}
								<CustomTouchableOpacity>
									<Text
										style={[
											{
												color: "white",
												fontSize: 18,
											},
											styles.primaryShadow,
										]}
									>
										保存
									</Text>
								</CustomTouchableOpacity>
							</View>

							{/* camera control  */}
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
									bottom: 10,
									position: "absolute",
									alignItems: "center",
									width: screenWidth,
								}}
							>
								<CustomTouchableOpacity>
									<Ionicons
										name="color-filter-outline"
										size={28}
										color={"white"}
									/>
								</CustomTouchableOpacity>
								<View style={{ width: 120 }}>
									<CustomTouchableOpacity
										style={[
											{
												width: 66,
												aspectRatio: "1/1",
												borderWidth: 5,
												borderColor: "white",
												borderRadius: 1000,
												marginHorizontal: "auto",
											},
										]}
									/>
								</View>
								<CustomTouchableOpacity>
									<MaterialIcons
										name="face-retouching-natural"
										size={30}
										color={"white"}
									/>
								</CustomTouchableOpacity>
							</View>
						</View>
					</View>

					{/* {!device && <ActivityIndicator size={"large"} />} */}

					{/* camera features overlay  */}
					{/* {device && (
						<GestureDetector gesture={gesture}>
							<ReanimatedCamera
								style={StyleSheet.absoluteFill}
								device={device}
								isActive={true}
								animatedProps={animatedProps}
							/>
						</GestureDetector>
					)} */}
				</View>

				{/* camera features - bottom container  */}
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						flex: 1,
						marginHorizontal: 40,
						opacity: 0.85,
					}}
				>
					<CustomTouchableOpacity style={styles.featureItem}>
						<IconFrame gradient={false} />
					</CustomTouchableOpacity>
					<CustomTouchableOpacity style={styles.featureItem}>
						<IconGrid gradient={false} />
					</CustomTouchableOpacity>
					<CustomTouchableOpacity style={styles.featureItem}>
						<IconExposure gradient={false} />
					</CustomTouchableOpacity>
					<CustomTouchableOpacity style={styles.featureItem}>
						<IconFlash gradient={false} />
					</CustomTouchableOpacity>
					<CustomTouchableOpacity style={styles.featureItem}>
						<IconRotate gradient={false} />
					</CustomTouchableOpacity>
				</View>
			</SafeAreaView>
		</>
	);
};

export default CameraScreen;
