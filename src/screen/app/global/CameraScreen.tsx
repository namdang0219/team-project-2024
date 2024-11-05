import { View, StyleSheet, useWindowDimensions, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { CustomTouchableOpacity } from "components/custom";
import { Camera, useCameraPermission } from "react-native-vision-camera";

import { darkTheme } from "util/theme/themeColors";
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
import CameraTopbar from "module/camera/CameraTopbar";
import ExposureSlider from "module/camera/ExposureSlider";
import CameraControl from "module/camera/CameraControl";

const CameraScreen = () => {
	const { width: screenWidth } = useWindowDimensions();
	const { hasPermission, requestPermission } = useCameraPermission();
	const [showEffectModal, setShowEffectModal] = useState<boolean>(false);
	const [photoUri, setPhotoUri] = useState<string | null>(null); // photoUri is image link of captured view after edit
	const [previewPhotoUri, setPreviewPhotoUri] = useState<string | null>(
		"https://i.pinimg.com/736x/0e/c3/11/0ec311868b1d93c17786c69adc54bcb1.jpg"
	); // previewPhotoUri is image link after press shutter button and before edit
	const viewRef = useRef<View>(null);
	const [exposureValue, setExposureValue] = useState<number>(0);

	const isFocused = useIsFocused();

	// toggle function to toggle show and hide
	const [grid, toggleGrid] = useToggle(false);
	const [backCamera, toggleCamera] = useToggle(false);
	const [flash, toggleFlash] = useToggle(false);
	const [showExposureSlider, toggleExposureSlider] = useToggle(false);

	useEffect(() => {
		if (!hasPermission) {
			requestPermission();
		}
	}, []);

	const cameraRef = useRef<Camera>(null);

	if (!hasPermission) return <Text>No permisson to access camera</Text>;

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
							<CameraTopbar
								photoUri={photoUri}
								previewPhotoUri={previewPhotoUri}
								setPhotoUri={setPhotoUri}
								setPreviewPhotoUri={setPreviewPhotoUri}
								viewRef={viewRef}
							/>

							{/* exposure slider  */}
							<ExposureSlider
								exposureValue={exposureValue}
								setExposureValue={setExposureValue}
								showExposureSlider={showExposureSlider}
							/>

							{/* camera control  */}
							{!previewPhotoUri && (
								<CameraControl
									cameraRef={cameraRef}
									flash={flash}
									setPreviewPhotoUri={setPreviewPhotoUri}
									setShowEffectModal={setShowEffectModal}
								/>
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
