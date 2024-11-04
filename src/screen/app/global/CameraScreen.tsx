import {
	View,
	StyleSheet,
	useWindowDimensions,
	Text,
	Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { CustomTouchableOpacity } from "components/custom";
import { Camera, useCameraPermission } from "react-native-vision-camera";

import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { darkTheme } from "util/theme/themeColors";
import {
	Feather,
	MaterialCommunityIcons,
	Ionicons,
	MaterialIcons,
} from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Animated as RNAnimated } from "react-native";
import { captureRef } from "react-native-view-shot";
import {
	IconColorFilter,
	IconLocation,
	IconPlus,
	IconSlider,
	IconTag,
} from "icon/camera-edit";
import GridSection from "module/camera/GridSection";
import CameraSection from "module/camera/CameraSection";
import CaptureArea from "module/camera/CaptureArea";
import NonePhotoBottomFeature from "module/camera/NonePhotoBottomFeature";
import { useToggle } from "hook/useToggle";
import EffectModal from "module/camera/EffectModal";

export interface ICameraScreen {
	cameraSide: "front" | "back";
}

function clamp(val: number, min: number, max: number) {
	return Math.min(Math.max(val, min), max);
}

const CameraScreen = () => {
	const { goBack, navigate } = useNavigation<any>();
	const { width: screenWidth } = useWindowDimensions();
	const { hasPermission, requestPermission } = useCameraPermission();
	const [isExposureSliderVisible, setIsExposureSliderVisible] =
		useState<boolean>(false);
	const [showEffectModal, setShowEffectModal] = useState<boolean>(false);
	const [photoUri, setPhotoUri] = useState<string | null>(null);
	const [previewPhotoUri, setPreviewPhotoUri] = useState<string | null>(null);
	const viewRef = useRef<View>(null);
	const fadeAnim = useRef(new RNAnimated.Value(0)).current;
	const translateYAnim = useRef(new RNAnimated.Value(20)).current;
	const isFocused = useIsFocused();

	// toggle function
	const [grid, toggleGrid] = useToggle(false);
	const [backCamera, toggleCamera] = useToggle(false);
	const [flash, toggleFlash] = useToggle(false);
	const [showExposureSlider, toggleExposureSlider] = useToggle(false);

	const takePhoto = async () => {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePhoto({
				flash: flash ? "on" : "off",
				enableShutterSound: false,
			});
			setPreviewPhotoUri(photo.path);
		}
	};

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

	const handleNavigateToSave = async () => {
		try {
			const capturedUri = await captureRef(viewRef, {
				format: "jpg",
				quality: 0.8,
			});
			setPhotoUri(capturedUri);
			navigate("SavePhotoScreen", { capturedUri });
		} catch (error) {
			console.error("Something went wrong!", error);
		}
	};

	if (!hasPermission) return <Text>No permisson to access camera</Text>;

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
			zIndex: 1000,
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
					{previewPhotoUri && (
						// capture area
						<CaptureArea
							viewRef={viewRef}
							previewPhotoUri={previewPhotoUri}
						/>
					)}

					{/* grid ui  */}
					{grid && <GridSection></GridSection>}

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
								<CustomTouchableOpacity
									onPress={() => {
										if (previewPhotoUri || photoUri) {
											setPreviewPhotoUri(null);
											setPhotoUri(null);
										} else {
											goBack();
										}
									}}
								>
									<Feather
										name="x"
										size={30}
										color={"white"}
										style={styles.primaryShadow}
									/>
								</CustomTouchableOpacity>
								{/* image flip  */}
								{previewPhotoUri && (
									<CustomTouchableOpacity>
										<MaterialCommunityIcons
											name="flip-horizontal"
											size={26}
											color={"white"}
											style={styles.primaryShadow}
										/>
									</CustomTouchableOpacity>
								)}
								{/* save button  */}
								{previewPhotoUri && (
									<CustomTouchableOpacity
										onPress={handleNavigateToSave}
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
								)}
							</View>

							{/* exposure slider  */}
							<RNAnimated.View
								style={[
									{
										position: "absolute",
										bottom: 80,
										width: screenWidth,
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
												width: (screenWidth / 3) * 2,
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
														height: [
															1, 41, 21,
														].includes(index + 1)
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

							{/* camera control  */}
							{!previewPhotoUri && (
								<View style={styles.cameraControl}>
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
											onPress={takePhoto}
										/>
									</View>
									<CustomTouchableOpacity
										onPress={() => setShowEffectModal(true)}
									>
										<MaterialIcons
											name="face-retouching-natural"
											size={30}
											color={"white"}
										/>
									</CustomTouchableOpacity>
								</View>
							)}
						</View>
					</View>

					{!previewPhotoUri && isFocused && (
						<CameraSection
							cameraSide={backCamera ? "back" : "front"}
							cameraRef={cameraRef}
							exposureValue={exposureValue}
						/>
					)}
				</View>

				{/* camera features - bottom container - image is null  */}
				{!previewPhotoUri && (
					<NonePhotoBottomFeature
						grid={grid}
						toggleGrid={toggleGrid}
						flash={flash}
						toggleFlash={toggleFlash}
						backCamera={backCamera}
						toggleCamera={toggleCamera}
						showExposureSlider={showExposureSlider}
						toggleExposureSlider={toggleExposureSlider}
					/>
				)}

				{/* camera features - bottom container - image is string  */}
				{previewPhotoUri && (
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
							<IconColorFilter gradient={false} />
						</CustomTouchableOpacity>
						<CustomTouchableOpacity style={styles.featureItem}>
							<IconSlider gradient={false} />
						</CustomTouchableOpacity>
						<CustomTouchableOpacity style={styles.featureItem}>
							<IconPlus gradient={false} />
						</CustomTouchableOpacity>
						<CustomTouchableOpacity style={styles.featureItem}>
							<IconTag gradient={false} />
						</CustomTouchableOpacity>
						<CustomTouchableOpacity style={styles.featureItem}>
							<IconLocation gradient={false} />
						</CustomTouchableOpacity>
					</View>
				)}
			</SafeAreaView>

			{/* modal  */}
			<EffectModal
				showEffectModal={showEffectModal}
				setShowEffectModal={setShowEffectModal}
			/>
		</>
	);
};

export default CameraScreen;
