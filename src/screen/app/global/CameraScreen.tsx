import {
	View,
	SafeAreaView,
	StatusBar,
	useWindowDimensions,
	Image,
	StyleSheet,
	Text,
	ImageBackground,
	Animated,
	PanResponder,
	Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { darkTheme } from "util/theme/themeColors";
import { useToggle } from "hook/useToggle";
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
	useCameraFormat,
	useFrameProcessor,
} from "react-native-vision-camera";
import CameraViewBottomAction from "./camera/CameraViewBottomAction";
import CameraViewTopBar from "./camera/CameraViewTopBar";
import CameraViewTrackingSticker from "./camera/CameraViewTrackingSticker";
import Reanimated from "react-native-reanimated";
import CameraViewBottom from "./camera/CameraViewBottom";
import { CustomTouchableOpacity } from "components/custom";
import PreviewBottomAction from "./camera/PreviewBottomAction";
import {
	IconDraw,
	IconEffect,
	IconImage,
	IconSticker,
	IconText,
} from "icon/camera-edit/add-item";
import ActionSheet, {
	ActionSheetRef,
	FlatList,
} from "react-native-actions-sheet";
import { DIMENTIONS } from "constant/dimention";
import { stickerList, trackingStickerList } from "mock/stickerMocks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Sticker } from "module/camera/Sticker";
import { Canvas, Path, Skia, SkPath } from "@shopify/react-native-skia";
import { IconRedo, IconUndo } from "icon/camera-edit/drawPad";
import ExposureSlider from "module/camera/ExposureSlider";

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

const STICKER_ITEM_GAP = 10;

const CameraScreen = () => {
	const { width, height } = useWindowDimensions();
	const insets = useSafeAreaInsets();
	const [previewPhotoUri, setPreviewPhotoUri] = useState<string>("");
	// const [previewPhotoUri, setPreviewPhotoUri] = useState<string>(
	// 	"https://i.pinimg.com/736x/79/79/19/7979191b43bbf31612a36b6343c8fa66.jpg"
	// );

	// toggle function to toggle show and hide (none preview image)
	const [grid, toggleGrid, setGrid] = useToggle(false);
	const [backCamera, toggleCamera] = useToggle(false);
	const [flash, toggleFlash, setFlash] = useToggle(false);
	const [showExposureSlider, toggleExposureSlider, setExposureSlider] =
		useToggle(false);
	const [exposureValue, setExposureValue] = useState<number>(0);

	useEffect(() => {
		if (previewPhotoUri) {
			setGrid(false);
		}
	}, [previewPhotoUri]);

	// bottom add item handler
	const translateYAnim = useRef(new Animated.Value(75)).current;
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const [showAddItem, toggleShowAddItem, setShowAddItem] = useToggle(false);
	const [drawPad, toggleDrawPad, setDrawPad] = useToggle(false);

	useEffect(() => {
		if (showAddItem) {
			Animated.parallel([
				// container anim
				Animated.timing(translateYAnim, {
					toValue: -10,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 300,
					delay: 150,
					useNativeDriver: true,
				}),
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(translateYAnim, {
					toValue: 75,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(fadeAnim, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start();
		}
	}, [showAddItem]);

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
	const format = useCameraFormat(device, [
		{ videoResolution: "max" },
		{ photoResolution: "max" },
	]);

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

	// sticker modal handler
	const allStickers = [...stickerList, ...trackingStickerList].map((s) => {
		return {
			sid: s.sid,
			uri: s.uri,
		};
	});
	const stickerModalRef = useRef<ActionSheetRef>(null);
	const stickerItemWidth = useItemWidth(STICKER_ITEM_GAP, 4);
	const [stickers, setStickers] = useState<{ sid: number; uri: string }[]>(
		[]
	);

	const addSticker = (stickerSource: string) => {
		setStickers([...stickers, { uri: stickerSource, sid: Date.now() }]);
	};

	// drawer path handler
	const [paths, setPaths] = useState<SkPath[]>([]); // save all paths
	const [redoPaths, setRedoPaths] = useState<SkPath[]>([]); // save paths was undo
	const [currentPath, setCurrentPath] = useState<SkPath | null>(null); // current path

	// start new path when drawing
	const startPath = (x: number, y: number) => {
		const newPath = Skia.Path.Make();
		newPath.moveTo(x, y);
		setCurrentPath(newPath);
	};

	// update path when move finger
	const updatePath = (x: number, y: number) => {
		if (currentPath) {
			currentPath.lineTo(x, y);
			setCurrentPath(currentPath.copy()); // update path to current path
		}
	};

	// finish path and save to current path
	const endPath = () => {
		if (currentPath) {
			setPaths([...paths, currentPath]);
			setCurrentPath(null);
			setRedoPaths([]); // Reset redoPaths when have new path created
		}
	};

	// undo last path
	const undo = () => {
		if (paths.length > 0) {
			const newPaths = [...paths];
			const lastPath = newPaths.pop();
			setPaths(newPaths);
			if (lastPath) setRedoPaths([...redoPaths, lastPath]);
		}
	};

	// redo path when undo ed
	const redo = () => {
		if (redoPaths.length > 0) {
			const newRedoPaths = [...redoPaths];
			const restoredPath = newRedoPaths.pop();
			setRedoPaths(newRedoPaths);
			if (restoredPath) setPaths([...paths, restoredPath]);
		}
	};

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderGrant: (evt) => {
			const { locationX, locationY } = evt.nativeEvent;
			startPath(locationX, locationY);
		},
		onPanResponderMove: (evt) => {
			const { locationX, locationY } = evt.nativeEvent;
			updatePath(locationX, locationY);
		},
		onPanResponderRelease: endPath,
	});

	return (
		<>
			<StatusBar barStyle={"light-content"} />
			<SafeAreaView
				style={{
					backgroundColor: darkTheme.colors.background,
					flex: 1,
					paddingTop:
						Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
						viewRef={viewRef}
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
								format={format}
								exposure={-(exposureValue / 100)}
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

						{/* drawed paths  */}
						<Canvas style={StyleSheet.absoluteFill}>
							{paths.map((path, index) => (
								<Path
									key={index}
									path={path}
									color="white"
									style="stroke"
									strokeWidth={3}
								/>
							))}
							{currentPath && (
								<Path
									path={currentPath}
									color="white"
									style="stroke"
									strokeWidth={3}
								/>
							)}
						</Canvas>

						{/* sticker field  */}
						<>
							{stickers &&
								stickers.map((sticker) => (
									<Sticker
										key={sticker.sid}
										source={sticker.uri}
									/>
								))}
						</>
					</View>

					{/* other section  */}
					{grid && <GridSection />}

					{/* add item  */}
					<Animated.View
						style={[
							{
								flexDirection: "row",
								position: "absolute",
								bottom: 0,
								width: 320,
								left: "50%",
								justifyContent: "space-between",
								zIndex: 1000,
							},
							{
								transform: [
									{ translateX: -160 },
									{ translateY: translateYAnim },
								],
								opacity: fadeAnim,
							},
						]}
					>
						<CustomTouchableOpacity
							style={[
								styles.itemContainer,
								{
									transform: [{ translateY: -16 }],
								},
							]}
						>
							<IconImage gradient />
						</CustomTouchableOpacity>
						<CustomTouchableOpacity
							style={[
								styles.itemContainer,
								{
									transform: [{ translateY: -5 }],
								},
							]}
						>
							<IconText gradient />
						</CustomTouchableOpacity>
						<CustomTouchableOpacity
							style={[
								styles.itemContainer,
								{
									transform: [{ translateY: -0 }],
								},
							]}
						>
							<IconEffect gradient />
						</CustomTouchableOpacity>
						<CustomTouchableOpacity
							style={[
								styles.itemContainer,
								{
									transform: [{ translateY: -5 }],
								},
							]}
							onPress={() => {
								// setPath(Skia.Path.Make());
								toggleDrawPad();
								setShowAddItem(false);
							}}
						>
							<IconDraw gradient />
						</CustomTouchableOpacity>
						<CustomTouchableOpacity
							onPress={() => {
								stickerModalRef.current?.show();
								setDrawPad(false);
							}}
							style={[
								styles.itemContainer,
								{
									transform: [{ translateY: -16 }],
								},
							]}
						>
							<IconSticker gradient />
						</CustomTouchableOpacity>
					</Animated.View>

					{drawPad && (
						<View
							style={[StyleSheet.absoluteFill, { zIndex: 10 }]}
							{...panResponder.panHandlers}
						>
							<CustomTouchableOpacity
								style={{
									position: "absolute",
									bottom: 10,
									left: width / 2 - 40,
									zIndex: 100,
								}}
								onPress={undo}
								disabled={paths.length === 0}
							>
								<IconUndo />
							</CustomTouchableOpacity>
							<CustomTouchableOpacity
								style={{
									position: "absolute",
									bottom: 10,
									right: width / 2 - 40,
									zIndex: 100,
								}}
								onPress={redo}
								disabled={redoPaths.length === 0}
							>
								<IconRedo />
							</CustomTouchableOpacity>
						</View>
					)}

					{/* drawed pad  */}

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

					<ExposureSlider
						exposureValue={exposureValue}
						setExposureValue={setExposureValue}
						showExposureSlider={showExposureSlider}
					></ExposureSlider>
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

				<ActionSheet
					ref={stickerModalRef}
					gestureEnabled
					indicatorStyle={styles.indicatorStyle}
					containerStyle={{
						backgroundColor: darkTheme.colors.background,
						height: height - insets.top - 50,
					}}
				>
					<View style={{ marginTop: 10 }}>
						<FlatList
							data={allStickers}
							ListHeaderComponent={
								<View style={{ gap: 10 }}>
									<Text
										style={{
											color: "white",
											fontSize: 18,
											fontWeight: "bold",
											textAlign: "center",
											paddingVertical: 4,
										}}
									>
										ステッカー一覧
									</Text>
								</View>
							}
							contentContainerStyle={{
								paddingHorizontal: DIMENTIONS.APP_PADDING,
								gap: STICKER_ITEM_GAP,
								paddingBottom: 150,
							}}
							columnWrapperStyle={{
								gap: STICKER_ITEM_GAP,
							}}
							numColumns={4}
							renderItem={({ item }) => (
								<CustomTouchableOpacity
									key={item.sid}
									onPress={() => {
										addSticker(item.uri);
										setShowAddItem(false);
										stickerModalRef.current?.hide();
									}}
								>
									<Image
										source={{
											uri: item.uri,
										}}
										style={{
											width: stickerItemWidth,
											height: stickerItemWidth,
											objectFit: "contain",
										}}
									/>
								</CustomTouchableOpacity>
							)}
						/>
					</View>
				</ActionSheet>
			</SafeAreaView>
		</>
	);
};
const styles = StyleSheet.create({
	itemContainer: {
		backgroundColor: "white",
		width: 48,
		height: 48,
		borderRadius: 1000,
		alignItems: "center",
		justifyContent: "center",
	},
	indicatorStyle: {
		backgroundColor: "white",
		height: 4,
		opacity: 0.6,
	},
	sheetTitle: {
		color: "white",
		fontSize: 18,
		textAlign: "center",
		fontWeight: "500",
	},
	containerStyle: {
		gap: STICKER_ITEM_GAP,
		paddingHorizontal: DIMENTIONS.APP_PADDING,
		paddingTop: DIMENTIONS.APP_PADDING,
		paddingBottom: 60,
	},
});

export default CameraScreen;
