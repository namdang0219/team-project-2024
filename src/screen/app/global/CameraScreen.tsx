import {
	View,
	Text,
	StyleSheet,
	Image,
	useWindowDimensions,
	ActivityIndicator,
	Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { CustomTouchableOpacity } from "components/custom";
import { IconCameraRotate } from "icon/camera";
import * as FaceDetector from "expo-face-detector";
import { Camera, CameraType, useCameraPermissions } from "expo-camera";
import { Button } from "components/button";

const CameraScreen = () => {
	const { colors } = useTheme();
	const [facing, setFacing] = useState<CameraType>("front");
	const { width: screenWidth } = useWindowDimensions();

	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		// Camera permissions are still loading.
		return <ActivityIndicator />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text>No permission to launch camera!</Text>
				<Button onPress={() => Linking.openSettings()}>
					Open setting
				</Button>
			</View>
		);
	}

	function toggleCameraFacing() {
		setFacing((current) => (current === "back" ? "front" : "back"));
	}

	const handleFacesDetected = ({ faces }: { faces: any }) => {
		console.log(faces);
	};

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
			width: 65,
			aspectRatio: "1/1",
			backgroundColor: colors.text,
			borderRadius: 1000,
			alignItems: "center",
			justifyContent: "center",
		},
		captureButtonSpacing: {
			width: 60,
			aspectRatio: "1/1",
			backgroundColor: colors.background,
			borderRadius: 1000,
			alignItems: "center",
			justifyContent: "center",
		},
		captureButton: {
			width: 55,
			aspectRatio: "1/1",
			backgroundColor: colors.text,
			borderRadius: 1000,
		},
	});

	return (
		<>
			<StatusBar style="light" />
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

					{/* <Camera
						onFacesDetected={handleFacesDetected}
						faceDetectorSettings={{
							mode: FaceDetector.FaceDetectorMode.fast,
							detectLandmarks:
								FaceDetector.FaceDetectorLandmarks.none,
							runClassifications:
								FaceDetector.FaceDetectorClassifications.none,
							minDetectionInterval: 100,
							tracking: true,
						}}
					/> */}

					{/* camera features overlay  */}
					<View style={styles.cameraFeatureContainer}>
						<View></View>
					</View>
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
