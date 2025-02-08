import {
	View,
	SafeAreaView,
	StatusBar,
	useWindowDimensions,
	Image,
	StyleSheet,
	Text,
	ImageBackground,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { darkTheme } from "util/theme/themeColors";
import { useToggle } from "hook/useToggle";
import { useNavigation } from "@react-navigation/native";
import { useItemWidth } from "hook/useItemWidth";
import GridSection from "module/camera/GridSection";
import {
	Face,
	useFaceDetector,
	FaceDetectionOptions,
} from "react-native-vision-camera-face-detector";
import { Worklets } from "react-native-worklets-core";
import {
	Camera,
	useCameraDevice,
	useFrameProcessor,
} from "react-native-vision-camera";
import CameraViewBottomAction from "./camera/CameraViewBottomAction";
import CameraViewTopBar from "./camera/CameraViewTopBar";
import CameraViewTrackingSticker from "./camera/CameraViewTrackingSticker";
import Reanimated from "react-native-reanimated";
import CameraViewBottom from "./camera/CameraViewBottom";
import { CustomTouchableOpacity } from "components/custom";
import {
	IconColorFilter,
	IconLocation,
	IconPlus,
	IconSlider,
	IconTag,
} from "icon/camera-edit";
import PreviewBottomAction from "./camera/PreviewBottomAction";

const STICKER_ITEM_GAP = 10;
export type TrackingStickerType = {
	sid: number;
	scale: number;
	rotate: number;
	offsetX: number;
	offsetY: number;
	uri: string;
};

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
	exposure: true,
});

const CameraScreen = () => {
	const { width } = useWindowDimensions();
	const [previewPhotoUri, setPreviewPhotoUri] = useState<string>("");

	// toggle function to toggle show and hide (none preview image)
	const [grid, toggleGrid] = useToggle(false);
	const [backCamera, toggleCamera] = useToggle(false);
	const [flash, toggleFlash] = useToggle(false);
	const [showExposureSlider, toggleExposureSlider] = useToggle(false);

	// handle Camera
	const [faces, setFaces] = useState<Face[]>([]);
	const cameraRef = useRef<Camera>(null);

	const faceDetectionOptions = useRef<FaceDetectionOptions>({
		landmarkMode: "all",
		autoScale: true,
		trackingEnabled: true,
		classificationMode: "all",
	}).current;

	const device: any = useCameraDevice(backCamera ? "back" : "front", {
		physicalDevices: [
			"ultra-wide-angle-camera",
			"wide-angle-camera",
			"telephoto-camera",
		],
	});
	const viewRef = useRef<ImageBackground>(null);

	const { detectFaces } = useFaceDetector(faceDetectionOptions);

	useEffect(() => {
		(async () => {
			await Camera.requestCameraPermission();
		})();
	}, [device]);

	const handleDetectedFaces = (faces: Face[]) => {
		if (faces.length === 0) {
			setFaces([]);
		} else {
			setFaces(faces);
		}
	};

	const myFunctionJS = Worklets.createRunOnJS(handleDetectedFaces);

	// Frame processor
	const frameProcessor = useFrameProcessor(
		(frame) => {
			"worklet";
			const detectedFaces = detectFaces(frame);
			myFunctionJS(detectedFaces.length > 0 ? detectedFaces : []);
		},
		[detectFaces]
	);

	const [currentTrackingSticker, setCurrentTrackingSticker] =
		useState<TrackingStickerType | null>(null);

	const [capturedPhoto, setCapturedPhoto] = useState<string>("");
	const [isCameraVisible, setIsCameraVisible] = useState<boolean>(true);

	const [showAddItem, toggleShowAddItem, setShowAddItem] = useToggle(false);

	return (
		<>
			<StatusBar barStyle={"light-content"} />
			<SafeAreaView
				style={{
					backgroundColor: darkTheme.colors.background,
					flex: 1,
				}}
			>
				{/* main camera ViewProps  */}
				<View
					style={{
						width,
						aspectRatio: "9/16",
						position: "relative",
						overflow: "hidden",
					}}
				>
					<CameraViewTopBar
						previewPhotoUri={previewPhotoUri}
						setIsCameraVisible={setIsCameraVisible}
						setPreviewPhotoUri={setPreviewPhotoUri}
					/>

					{/* 💹 camera capture view  */}
					<View
						ref={viewRef}
						style={{ flex: 1, position: "relative" }}
					>
						{capturedPhoto && (
							<Image
								source={{ uri: capturedPhoto }}
								style={{
									flex: 1,
									position: "absolute",
									width: "100%",
									height: "100%",
								}}
							/>
						)}
						{previewPhotoUri ? (
							<Image
								source={{
									uri: previewPhotoUri,
								}}
								style={{ flex: 1 }}
							/>
						) : !!device ? (
							<ReanimatedCamera
								style={StyleSheet.absoluteFill}
								ref={cameraRef}
								device={device}
								isActive={isCameraVisible}
								frameProcessor={frameProcessor}
								fps={16}
								photo
							/>
						) : (
							<View
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Text style={{ color: "white" }}>
									カメラが見つかれません
								</Text>
							</View>
						)}

						<CameraViewTrackingSticker
							currentTrackingSticker={currentTrackingSticker}
							faces={faces}
						/>
					</View>

					{/* other section  */}
					{grid && <GridSection />}

					{/* camera bottom container  */}
					{!previewPhotoUri && (
						<CameraViewBottom
							setCurrentTrackingSticker={
								setCurrentTrackingSticker
							}
							cameraRef={cameraRef}
							viewRef={viewRef}
							setPreviewPhotoUri={setPreviewPhotoUri}
							flash={flash}
							setIsCameraVisible={setIsCameraVisible}
							setCapturedPhoto={setCapturedPhoto}
						/>
					)}
				</View>

				{/* bottom action  */}
				{previewPhotoUri ? (
					<PreviewBottomAction
						showAddItem={showAddItem}
						toggleShowAddItem={toggleShowAddItem}
					/>
				) : (
					<CameraViewBottomAction
						toggleGrid={toggleGrid}
						toggleExposureSlider={toggleExposureSlider}
						toggleFlash={toggleFlash}
						toggleCamera={toggleCamera}
						grid={grid}
						showExposureSlider={showExposureSlider}
						flash={flash}
						backCamera={backCamera}
					/>
				)}
			</SafeAreaView>
		</>
	);
};

export default CameraScreen;
