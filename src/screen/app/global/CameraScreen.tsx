import {
	View,
	StyleSheet,
	useWindowDimensions,
	Text,
	ActivityIndicator,
	Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { CustomTouchableOpacity } from "components/custom";
import {
	Camera,
	useCameraDevice,
	useCameraPermission,
} from "react-native-vision-camera";

import Reanimated, {
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
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
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Animated as RNAnimated } from "react-native";

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
	exposure: true,
});

function clamp(val: number, min: number, max: number) {
	return Math.min(Math.max(val, min), max);
}

const CameraScreen = () => {
	const { colors } = useTheme();
	const { goBack, navigate } = useNavigation();
	const { width: screenWidth } = useWindowDimensions();
	const { hasPermission, requestPermission } = useCameraPermission();
	const [isFlashOn, setIsFlashOn] = useState<boolean>(false);
	const [showGrid, setShowGrid] = useState<boolean>(false);
	const [isExposureSliderVisible, setIsExposureSliderVisible] =
		useState<boolean>(false);

	const fadeAnim = useRef(new RNAnimated.Value(0)).current; // Giá trị cho opacity
	const translateYAnim = useRef(new RNAnimated.Value(20)).current; // Giá trị cho vị trí

	useEffect(() => {
		if (isExposureSliderVisible) {
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
	}, [isExposureSliderVisible]);

	const translationX = useSharedValue(0);
	const prevTranslationX = useSharedValue(0);

	const [exposureValue, setExposureValue] = useState<number>(0);

	const exposureAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translationX.value }],
	}));

	useEffect(() => {
		if (!hasPermission) {
			requestPermission();
		}
	}, []);

	const cameraRef = useRef<Camera>(null);

	const device = useCameraDevice("front", {
		physicalDevices: [
			"ultra-wide-angle-camera",
			"wide-angle-camera",
			"telephoto-camera",
		],
	});

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

	const slidePan = Gesture.Pan()
		.minDistance(1)
		.onStart(() => {
			prevTranslationX.value = translationX.value;
		})
		.onUpdate((event) => {
			const maxTranslateX = screenWidth / 3;

			setExposureValue(
				Math.floor((translationX.value * 50) / (screenWidth / 6))
			); // update exposure value to ui

			translationX.value = clamp(
				prevTranslationX.value + event.translationX,
				-maxTranslateX,
				maxTranslateX
			);
		})
		.runOnJS(true);

	const styles = StyleSheet.create({
		cameraContainer: {
			backgroundColor: darkTheme.colors.background,
			aspectRatio: "9/16",
			borderRadius: 15,
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
		cameraControl: {
			flexDirection: "row",
			justifyContent: "center",
			bottom: 10,
			position: "absolute",
			alignItems: "center",
			width: screenWidth,
		},
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
		shutterButton: {
			width: 66,
			aspectRatio: "1/1",
			borderWidth: 5,
			borderColor: "white",
			borderRadius: 1000,
			marginHorizontal: "auto",
		},
		line: {
			position: "absolute",
			backgroundColor: "rgba(255, 255, 255, 0.5)", // Màu trắng nhạt với độ trong suốt
		},
		horizontalLine: {
			width: "100%",
			height: 1, // Độ dày của đường kẻ
		},
		verticalLine: {
			height: "100%",
			width: 1, // Độ dày của đường kẻ
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

					{showGrid && (
						<View style={StyleSheet.absoluteFill}>
							<View
								style={[
									styles.line,
									styles.horizontalLine,
									{ top: "33.33%" },
								]}
							/>
							<View
								style={[
									styles.line,
									styles.horizontalLine,
									{ top: "66.66%" },
								]}
							/>
							{/* Đường dọc */}
							<View
								style={[
									styles.line,
									styles.verticalLine,
									{ left: "33.33%" },
								]}
							/>
							<View
								style={[
									styles.line,
									styles.verticalLine,
									{ left: "66.66%" },
								]}
							/>
						</View>
					)}

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
								<CustomTouchableOpacity onPress={goBack}>
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
								<CustomTouchableOpacity
									onPress={() =>
										navigate("SavePhotoScreen" as never)
									}
								>
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
							<View style={styles.cameraControl}>
								{/* exposure slider  */}
								<RNAnimated.View
									style={[
										{
											position: "absolute",
											bottom: 80,
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
													width:
														(screenWidth / 3) * 2,
													justifyContent:
														"space-between",
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
															height: [
																1, 41, 21,
															].includes(
																index + 1
															)
																? 12
																: 6,
															width: 1,
															backgroundColor:
																"yellow",
														}}
													></View>
												))}
										</Animated.View>
									</GestureDetector>

									{/* exposure value  */}
									<Text style={styles.exposureValue}>
										{exposureValue * -1}
									</Text>
								</RNAnimated.View>

								<CustomTouchableOpacity>
									<Ionicons
										name="color-filter-outline"
										size={28}
										color={"white"}
									/>
								</CustomTouchableOpacity>
								<View style={{ width: 120 }}>
									<CustomTouchableOpacity
										style={[styles.shutterButton]}
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

					{device && (
						<ReanimatedCamera
							ref={cameraRef}
							style={StyleSheet.absoluteFill}
							device={device}
							isActive={false}
						/>
					)}
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
					<CustomTouchableOpacity
						style={styles.featureItem}
						onPress={() => setShowGrid(!showGrid)}
					>
						<IconGrid gradient={showGrid ? true : false} />
					</CustomTouchableOpacity>
					<CustomTouchableOpacity
						style={styles.featureItem}
						onPress={() => {
							setIsExposureSliderVisible(
								!isExposureSliderVisible
							);
						}}
					>
						<IconExposure
							gradient={isExposureSliderVisible ? true : false}
						/>
					</CustomTouchableOpacity>
					<CustomTouchableOpacity
						style={styles.featureItem}
						onPress={() => setIsFlashOn(!isFlashOn)}
					>
						<IconFlash gradient={isFlashOn ? true : false} />
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
