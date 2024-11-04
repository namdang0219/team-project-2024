import {
	View,
	StyleSheet,
	useWindowDimensions,
	Text,
	ActivityIndicator,
	Image,
	Pressable,
	Modal,
	FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
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
import { BlurView } from "expo-blur";
import {
	Route,
	SceneMap,
	TabBar,
	TabBarProps,
	TabView,
} from "react-native-tab-view";
import { captureRef } from "react-native-view-shot";

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
	exposure: true,
});

function clamp(val: number, min: number, max: number) {
	return Math.min(Math.max(val, min), max);
}

const CameraScreen = () => {
	const { goBack, navigate } = useNavigation<any>();
	const { width: screenWidth } = useWindowDimensions();
	const { hasPermission, requestPermission } = useCameraPermission();
	const [isFlashOn, setIsFlashOn] = useState<
		"on" | "off" | "auto" | undefined
	>("off");
	const [showGrid, setShowGrid] = useState<boolean>(false);
	const [isExposureSliderVisible, setIsExposureSliderVisible] =
		useState<boolean>(false);
	const [showEffectModal, setShowEffectModal] = useState<boolean>(false);
	const [photoUri, setPhotoUri] = useState<string | null>(null);
	const [previewPhotoUri, setPreviewPhotoUri] = useState<string | null>(null);
	const viewRef = useRef<View>(null);
	const fadeAnim = useRef(new RNAnimated.Value(0)).current;
	const translateYAnim = useRef(new RNAnimated.Value(20)).current;
	const [cameraSide, setCameraSide] = useState<"front" | "back">("back");
	const isFocused = useIsFocused();

	const toogleCameraSide = () => {
		setCameraSide((current) => (current === "front" ? "back" : "front"));
	};

	const takePhoto = async () => {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePhoto({
				flash: isFlashOn,
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

	const device = useCameraDevice(cameraSide, {
		physicalDevices: [
			"ultra-wide-angle-camera",
			"wide-angle-camera",
			"telephoto-camera",
		],
	});

	const handleNavigateToSave = async () => {
		try {
			const capturedUri = await captureRef(viewRef, {
				format: "jpg",
				quality: 0.8,
			});
			setPhotoUri(capturedUri);
			navigate("SavePhotoScreen", { capturedUri });
		} catch (error) {
			console.error("Lỗi khi chụp ảnh màn hình:", error);
		}
	};

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
		line: {
			position: "absolute",
			backgroundColor: "rgba(255, 255, 255, 0.5)",
		},
		horizontalLine: {
			width: "100%",
			height: 1,
		},
		verticalLine: {
			height: "100%",
			width: 1,
		},
		modalOverlay: {
			flex: 1,
			backgroundColor: "transparent",
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
						<View ref={viewRef}>
							<Image
								source={{
									uri: previewPhotoUri,
								}}
								style={{
									aspectRatio: "9/16",
									width: screenWidth,
								}}
							/>
						</View>
					)}

					{/* grid ui  */}
					{showGrid && (
						<View style={[{ zIndex: 1 }, StyleSheet.absoluteFill]}>
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
						</View>
					</View>

					{!previewPhotoUri && !device && (
						<ActivityIndicator size={"large"} />
					)}

					{!previewPhotoUri && isFocused && device && (
						<ReanimatedCamera
							ref={cameraRef}
							style={StyleSheet.absoluteFill}
							device={device}
							isActive={true}
							photo
							exposure={exposureValue * -0.01}
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
					<Pressable style={styles.featureItem}>
						<IconFrame gradient={false} />
					</Pressable>
					<Pressable
						style={styles.featureItem}
						onPress={() => setShowGrid(!showGrid)}
					>
						<IconGrid gradient={showGrid ? true : false} />
					</Pressable>
					<Pressable
						style={styles.featureItem}
						onPress={() =>
							setIsExposureSliderVisible(!isExposureSliderVisible)
						}
					>
						<IconExposure
							gradient={isExposureSliderVisible ? true : false}
						/>
					</Pressable>
					<Pressable
						style={styles.featureItem}
						onPress={() =>
							setIsFlashOn((prev) =>
								prev == "on" ? "off" : "on"
							)
						}
					>
						<IconFlash
							gradient={isFlashOn == "on" ? true : false}
						/>
					</Pressable>
					<Pressable
						style={styles.featureItem}
						onPress={toogleCameraSide}
					>
						<IconRotate gradient={false} />
					</Pressable>
				</View>
			</SafeAreaView>

			{/* modal  */}
			<Modal
				transparent={true}
				visible={showEffectModal}
				animationType="slide"
				onRequestClose={() => setShowEffectModal(false)}
			>
				<View style={styles.modalOverlay}>
					{/* backdrop  */}
					<Pressable
						style={{ flex: 1 }}
						onPress={() => setShowEffectModal(false)}
					/>

					{/* modal content  */}
					{/* <View style={[styles.modalContent, { height: 350 }]}>
						
					</View> */}
					<BlurView
						tint="dark"
						style={{
							overflow: "hidden",
							height: screenWidth,
							borderTopLeftRadius: 15,
							borderTopRightRadius: 15,
							backgroundColor: "rgba(0,0,0,0.2)",
						}}
					>
						<EffectModalContent />
					</BlurView>
				</View>
			</Modal>
		</>
	);
};

const EffectModalContent = () => {
	const layout = useWindowDimensions();

	const padding = 10;

	const gap = 10;
	const numColumns = 4;

	const availableSpace = layout.width - (numColumns - 1) * gap - padding * 2;
	const itemSize = availableSpace / numColumns;

	const FirstRoute = () => {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: "transparent",
					paddingHorizontal: padding,
				}}
			>
				<FlatList
					data={new Array(18).fill(0)}
					keyExtractor={(item, index) => index.toString()}
					numColumns={numColumns}
					contentContainerStyle={{ gap, paddingTop: padding }}
					columnWrapperStyle={{ gap }}
					renderItem={({ item, index }) => (
						<View key={index}>
							<Image
								source={{
									uri: "https://i.pinimg.com/736x/bc/b4/b8/bcb4b89ed0a80184c54db62d0a5cf179.jpg",
								}}
								style={{ width: itemSize, aspectRatio: "1/1" }}
							></Image>
						</View>
					)}
				/>
			</View>
		);
	};

	const SecondRoute = () => {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: "transparent",
					paddingHorizontal: padding,
				}}
			>
				<FlatList
					data={new Array(18).fill(0)}
					keyExtractor={(item, index) => index.toString()}
					numColumns={numColumns}
					contentContainerStyle={{ gap, paddingTop: padding }}
					columnWrapperStyle={{ gap }}
					renderItem={({ item, index }) => (
						<View key={index}>
							<Image
								source={{
									uri: "https://i.pinimg.com/originals/03/9f/54/039f546ad4bd2a52ea4da370035e5b73.gif",
								}}
								style={{
									width: itemSize,
									aspectRatio: "1/1",
									objectFit: "cover",
								}}
							></Image>
						</View>
					)}
				/>
			</View>
		);
	};

	const renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
	});

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: "first", title: "保存済み" },
		{ key: "second", title: "流行中" },
	]);

	const renderTabBar = (props: TabBarProps<Route>) => (
		<TabBar
			{...props}
			indicatorStyle={{
				backgroundColor: "white",
				height: 2,
			}}
			contentContainerStyle={{
				borderBottomColor: "#d3d3d3",
				borderBottomWidth: 0.5,
			}}
			tabStyle={{ width: 90 }}
			labelStyle={{
				fontSize: 16,
				fontWeight: "500",
				color: "white",
			}}
			renderLabel={({ route, focused, color }) => (
				<Text
					style={{ color: "white", fontSize: 15, fontWeight: "500" }}
				>
					{route.title}
				</Text>
			)}
			style={{
				backgroundColor: "transparent",
				elevation: 0,
				shadowOpacity: 0,
			}}
		/>
	);

	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			renderTabBar={renderTabBar}
		/>
	);
};

export default CameraScreen;
