import React, { useState, useEffect, useRef } from "react";
import {
	Alert,
	Dimensions,
	Image,
	StyleSheet,
	Text,
	View,
	FlatList,
	Modal,
	RefreshControl,
	TextInput,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import MapView, { Region, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { CustomTouchableOpacity } from "components/custom";
import { useTheme } from "@react-navigation/native";
import {
	AntDesign,
	FontAwesome6,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { GLOBAL_GRADIENT } from "util/theme/themeColors";
import Animated, {
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { NativeViewGestureHandler } from "react-native-gesture-handler";
import { DIMENTIONS } from "constant/dimention";
import { useItemWidth } from "hook/useItemWidth";
import { OptionModal } from "components/modal";
import { Ionicons } from "@expo/vector-icons";
import { AutoHeightImage } from "components/image";
import MapViewDirections from "react-native-maps-directions";

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const { width, height } = Dimensions.get("screen");

const initialRegion = {
	latitude: -37.78825,
	longitude: -122.4324,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
};

const MapScreen = () => {
	return (
		<View style={{ flex: 1, position: "relative" }}>
			<MapSection />
		</View>
	);
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const MapSection = ({
	children,
	renderMarker,
	markers,
}: {
	children?: any;
	renderMarker?: any;
	markers?: any[];
}) => {
	const mapRef = useRef<MapView | null>(null);
	const { colors } = useTheme();
	const insets = useSafeAreaInsets();
	const [activeTab, setActiveTab] = useState<"personal" | "explore">(
		"personal"
	);
	const itemWidth = useItemWidth(4, 3);

	const actionSheetRef = useRef<ActionSheetRef>(null);

	const [ready, setReady] = useState(true);

	const [currentLocation, setCurrentLocation] = useState<Region>();

	const [heading, setHeading] = useState(0);

	const setMapRegion = (newRegion: Region) => {
		if (ready && mapRef.current) {
			setTimeout(
				() =>
					mapRef.current && mapRef.current.animateToRegion(newRegion),
				10
			);
		}
	};

	const testLocation = {
		latitude: 37.787094190061325,
		longitude: -122.40435593090945,
	};

	const destination = {
		latitude: 37.78514356762952,
		longitude: -122.41106500691487,
	};

	const getCurrentPosition = async () => {
		try {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Permission to access location was denied");
				return;
			}

			let currentLocation = await Location.getCurrentPositionAsync({});
			const newRegion = {
				latitude: currentLocation.coords.latitude,
				longitude: currentLocation.coords.longitude,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			};
			setMapRegion(newRegion);
			setCurrentLocation(newRegion);

			Location.watchHeadingAsync((headingData) => {
				setHeading(headingData.trueHeading); // Hướng chính xác (true north)
			});
		} catch (error: any) {
			Alert.alert("Error", error.message || "Error getting location");
		}
	};

	useEffect(() => {
		console.log("Component did mount, ready to get current location");
		getCurrentPosition();
	}, []);

	const onMapReady = () => {
		if (!ready) {
			setReady(true);
		}
	};

	const onRegionChange = (region: Region) => {
		console.log("onRegionChange", region);
	};

	const onRegionChangeComplete = (region: Region) => {
		console.log("onRegionChangeComplete", region);
	};

	const TAB_WIDTH = 150;
	const TAB_HEIGHT = 45;
	const PADDING = 5;
	const TAB_ITEM_WIDTH = (TAB_WIDTH - PADDING * 2) / 2;
	const TAB_ITEM_HEIGHT = TAB_HEIGHT - PADDING * 2;

	const styles = StyleSheet.create({
		locationButton: {
			position: "absolute",
			width: 50,
			aspectRatio: "1/1",
			bottom: 110,
			left: "50%",
			backgroundColor: colors.background,
			borderRadius: 1000,
			alignItems: "center",
			justifyContent: "center",
			transform: [{ translateX: -25 }],
		},
		tabButtonContainer: {
			width: TAB_ITEM_WIDTH,
			height: TAB_ITEM_HEIGHT,
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 1000,
			zIndex: 1000,
			position: "absolute",
			flex: 1,
		},
		tabButtonContent: {
			fontSize: 16,
		},
	});

	const translateX = useSharedValue(0);

	useEffect(() => {
		if (activeTab === "personal") {
			translateX.value = withTiming(0);
		} else if (activeTab === "explore") {
			translateX.value = withTiming(TAB_ITEM_WIDTH);
		}
	}, [activeTab]);

	const handleOpenSheet = () => {
		actionSheetRef.current?.show();
	};

	const [viewType, setViewType] = useState<"grid" | "post">("grid");

	const DATA = new Array(20).fill(null);

	const [showPostModal, setShowPostModal] = useState<boolean>(false);

	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

	const onRefresh = () => {
		setIsRefreshing(true);
		setTimeout(() => {
			setIsRefreshing(false);
		}, 2000);
	};

	return (
		<>
			<MapView
				showsUserLocation
				ref={mapRef}
				// data={markers}
				initialRegion={initialRegion}
				// renderMarker={renderMarker}
				onMapReady={onMapReady}
				showsMyLocationButton
				// provider="google"
				// onRegionChange={onRegionChange}
				onRegionChangeComplete={onRegionChangeComplete}
				style={StyleSheet.absoluteFill}
			>
				<Marker
					coordinate={testLocation}
					style={{
						// backgroundColor: "cyan",
						transform: [{ translateX: 30 }, { translateY: -20 }],
					}}
				>
					<CustomTouchableOpacity
						onPress={() => handleOpenSheet()}
						style={{
							position: "relative",
							width: 92,
							height: 92,
							alignItems: "center",
							justifyContent: "center",
							transform: [
								{ translateX: -30 },
								{ translateY: 20 },
							],
						}}
					>
						<FontAwesome6
							name="location-dot"
							color="red"
							size={45}
							styles={{}}
						/>
						<View
							style={{
								width: 26,
								aspectRatio: 1,
								borderRadius: 100,
								position: "absolute",
								top: -28,
								right: -40,
								zIndex: 10000,
								backgroundColor: "white",
								alignItems: "center",
								justifyContent: "center",
								elevation: 1,
								shadowRadius: 5,
								shadowOpacity: 0.15,
								shadowOffset: { width: 0, height: 0 },
							}}
						>
							<Text
								style={{
									color: colors.primary,
									fontSize: 10,
									fontWeight: "500",
								}}
							>
								+20
							</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								position: "absolute",
								top: -18,
								left: 40,
							}}
						>
							{Array(3)
								.fill(null)
								.map((_, index) => (
									<View
										key={index}
										style={{
											borderWidth: 3,
											borderColor: "white",
											borderRadius: 15,
											overflow: "hidden",
											transform: [
												{
													translateX:
														index === 0
															? 0
															: index * -42,
												},
											],
										}}
									>
										<Image
											source={{
												uri: "https://i.pinimg.com/736x/d8/63/eb/d863eb6c54b3c8c1f9acd218cda19226.jpg",
											}}
											style={{
												width: 50,
												aspectRatio: 1,
											}}
										></Image>
									</View>
								))}
						</View>
					</CustomTouchableOpacity>
				</Marker>
				<Marker
					coordinate={destination}
					style={{
						// backgroundColor: "cyan",
						transform: [{ translateX: 30 }, { translateY: -20 }],
					}}
				>
					<CustomTouchableOpacity
						onPress={() => handleOpenSheet()}
						style={{
							position: "relative",
							width: 92,
							height: 92,
							alignItems: "center",
							justifyContent: "center",
							transform: [
								{ translateX: -30 },
								{ translateY: 20 },
							],
						}}
					>
						<FontAwesome6
							name="location-dot"
							color="red"
							size={45}
							styles={{}}
						/>
						<View
							style={{
								width: 26,
								aspectRatio: 1,
								borderRadius: 100,
								position: "absolute",
								top: -28,
								right: -40,
								zIndex: 10000,
								backgroundColor: "white",
								alignItems: "center",
								justifyContent: "center",
								elevation: 1,
								shadowRadius: 5,
								shadowOpacity: 0.15,
								shadowOffset: { width: 0, height: 0 },
							}}
						>
							<Text
								style={{
									color: colors.primary,
									fontSize: 10,
									fontWeight: "500",
								}}
							>
								+20
							</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								position: "absolute",
								top: -18,
								left: 40,
							}}
						>
							{Array(3)
								.fill(null)
								.map((_, index) => (
									<View
										key={index}
										style={{
											borderWidth: 3,
											borderColor: "white",
											borderRadius: 15,
											overflow: "hidden",
											transform: [
												{
													translateX:
														index === 0
															? 0
															: index * -42,
												},
											],
										}}
									>
										<Image
											source={{
												uri: "https://i.pinimg.com/736x/d8/63/eb/d863eb6c54b3c8c1f9acd218cda19226.jpg",
											}}
											style={{
												width: 50,
												aspectRatio: 1,
											}}
										></Image>
									</View>
								))}
						</View>
					</CustomTouchableOpacity>
				</Marker>

				{/* <MapViewDirections
					origin={currentLocation}
					destination={destination}
					apikey={
						process.env.EXPO_PUBLIC_GOOGLE_DIRECTIONS_API as string
					}
					strokeWidth={4}
					strokeColor="blue"
					tappable
					mode="WALKING"
				/> */}
			</MapView>

			{/* current location button  */}
			<CustomTouchableOpacity
				style={styles.locationButton}
				onPress={getCurrentPosition}
			>
				<MaterialCommunityIcons
					name="navigation-variant"
					size={25}
					color={colors.primary}
				/>
			</CustomTouchableOpacity>

			{/* tab container  */}
			<View
				style={{
					position: "absolute",
					top: insets.top + 8,
					left: "50%",
					transform: [{ translateX: -TAB_WIDTH / 2 }],
					zIndex: 1000,
				}}
			>
				<View
					style={{
						backgroundColor: "white",
						borderRadius: 1000,
						padding: 5,
						flexDirection: "row",
						position: "relative",
						width: TAB_WIDTH,
						height: TAB_HEIGHT,
					}}
				>
					<AnimatedLinearGradient
						colors={[
							GLOBAL_GRADIENT.STOP_1,
							GLOBAL_GRADIENT.STOP_2,
						]}
						style={{
							width: TAB_ITEM_WIDTH,
							height: TAB_ITEM_HEIGHT,
							borderRadius: 1000,
							zIndex: 10,
							position: "absolute",
							top: PADDING,
							left: PADDING,
							transform: [{ translateX: translateX }],
						}}
					/>
					<CustomTouchableOpacity
						style={[
							styles.tabButtonContainer,
							{ left: PADDING, top: PADDING },
						]}
						onPress={() => setActiveTab("personal")}
					>
						<Text
							style={[
								styles.tabButtonContent,
								{
									color:
										activeTab == "personal"
											? "white"
											: "black",
								},
							]}
						>
							個人
						</Text>
					</CustomTouchableOpacity>
					<CustomTouchableOpacity
						style={[
							styles.tabButtonContainer,
							{ left: PADDING + TAB_ITEM_WIDTH, top: PADDING },
						]}
						onPress={() => setActiveTab("explore")}
					>
						<Text
							style={[
								styles.tabButtonContent,
								{
									color:
										activeTab == "explore"
											? "white"
											: "black",
								},
							]}
						>
							見つけ
						</Text>
					</CustomTouchableOpacity>
				</View>
			</View>

			{/* bottom action sheet  */}
			<ActionSheet
				ref={actionSheetRef}
				gestureEnabled
				snapPoints={[30, 60, 100]}
				initialSnapIndex={1}
				safeAreaInsets={{
					top: insets.top + 10,
					bottom: 0,
					left: 0,
					right: 0,
				}}
			>
				{/* Post Modal  */}
				<Modal
					visible={showPostModal}
					animationType="slide"
					onDismiss={() => setShowPostModal(false)}
				>
					<KeyboardAvoidingView
						style={{
							flex: 1,
							paddingTop: insets.top,
							position: "relative",
						}}
						behavior={Platform.OS === "ios" ? "padding" : "height"}
					>
						{/* header  */}
						<View
							style={{
								height: DIMENTIONS.HEADER_HEIGHT,
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								paddingHorizontal: DIMENTIONS.APP_PADDING,
							}}
						>
							<CustomTouchableOpacity
								style={{ width: 60 }}
								onPress={() => setShowPostModal(false)}
							>
								<Text style={{ fontSize: 16, color: "blue" }}>
									閉じる
								</Text>
							</CustomTouchableOpacity>
							<Text style={{ fontSize: 18, fontWeight: "500" }}>
								投稿
							</Text>
							<CustomTouchableOpacity style={{ width: 60 }}>
								<Text
									style={{
										fontSize: 16,
										textAlign: "right",
										color: "blue",
									}}
								>
									シェア
								</Text>
							</CustomTouchableOpacity>
						</View>

						{/* content container  */}
						<FlatList
							data={new Array(8).fill(0)}
							style={{ flex: 1 }}
							refreshControl={
								<RefreshControl
									refreshing={isRefreshing}
									onRefresh={onRefresh}
								/>
							}
							ListHeaderComponent={
								<View>
									<AutoHeightImage
										source={{
											uri: "https://i.pinimg.com/736x/3e/29/12/3e291222c267b0c5527271fd2dcb2e3c.jpg",
										}}
									/>
									<View>
										<View
											style={{
												flexDirection: "row",
												marginTop: 8,
												paddingHorizontal:
													DIMENTIONS.APP_PADDING,
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<View>
												<Text
													style={{
														color: colors.subGray,
														fontSize: 12,
													}}
												>
													2022/10/19
												</Text>
												<Text
													style={{
														fontSize: 18,
														fontWeight: "500",
													}}
												>
													MeowCopter
												</Text>
											</View>
											<View
												style={{
													flexDirection: "row",
													gap: 12,
													alignItems: "center",
												}}
											>
												<AntDesign
													name="heart"
													size={24}
													color={"red"}
												/>
												<Ionicons
													name="share-outline"
													size={26}
													color={colors.subGray}
													style={{
														marginTop: -2,
													}}
												/>
											</View>
										</View>
									</View>
									<View
										style={{
											paddingHorizontal:
												DIMENTIONS.APP_PADDING,
										}}
									>
										<Text
											style={{
												marginTop: 6,
												fontSize: 14,
												lineHeight: 22,
											}}
										>
											アイスランド南海岸は最も人気のある観光ルートの一つです。アイスランド旅行には外せない場所でもあります。滝、氷河、火山が美しいのはもちろんのこと、この地域の海岸は
										</Text>
										<Text
											style={{
												marginTop: 20,
												fontSize: 16,
												fontWeight: "500",
												marginBottom: 5,
											}}
										>
											コメント
										</Text>
									</View>
								</View>
							}
							contentContainerStyle={{ paddingBottom: 50 }}
							keyExtractor={(_, index) => index.toString()}
							renderItem={({ item, index }) => (
								<View
									style={{
										paddingHorizontal:
											DIMENTIONS.APP_PADDING,
										paddingVertical: 10,
									}}
								>
									<View
										style={{
											flexDirection: "row",
											gap: 10,
										}}
									>
										<Image
											source={{
												uri: "https://i.pinimg.com/736x/39/bb/cb/39bbcb7d62e8e88d0258424f8f19bd05.jpg",
											}}
											style={{
												width: 40,
												aspectRatio: 1,
												borderRadius: 100,
											}}
										/>

										<View style={{ flex: 1 }}>
											{/* name and comment time  */}
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
													justifyContent:
														"space-between",
												}}
											>
												<Text
													style={{
														fontWeight: "500",
													}}
												>
													Captain America
												</Text>
												<Text
													style={{
														fontWeight: "400",
														color: colors.subGray,
														fontSize: 12,
													}}
												>
													2022/12/22
												</Text>
											</View>
											{/* comment content  */}
											<Text style={{ marginTop: 6 }}>
												アークレイリとミーヴァトン湖周辺（通年）
											</Text>
											<View
												style={{
													flexDirection: "row",
													gap: 20,
													alignItems: "center",
													marginTop: 5,
												}}
											>
												<CustomTouchableOpacity>
													<Text
														style={{
															fontSize: 12,
															color: colors.subGray,
														}}
													>
														いいね
													</Text>
												</CustomTouchableOpacity>
												<CustomTouchableOpacity>
													<Text
														style={{
															fontSize: 12,
															color: colors.subGray,
														}}
													>
														報告
													</Text>
												</CustomTouchableOpacity>
											</View>
										</View>
									</View>
								</View>
							)}
						/>
						<View
							style={[
								{
									backgroundColor: "white",
									paddingTop: 10,
									paddingBottom: insets.bottom + 10,
									paddingHorizontal: DIMENTIONS.APP_PADDING,
									flexDirection: "row",
									gap: 10,
								},
							]}
						>
							<TextInput
								placeholder="コメントを入力"
								style={{
									flex: 1,
									backgroundColor: colors.input,
									paddingHorizontal: 16,
									height: 42,
									borderRadius: 10,
								}}
							/>
							<CustomTouchableOpacity>
								<LinearGradient
									colors={[
										GLOBAL_GRADIENT.STOP_1,
										GLOBAL_GRADIENT.STOP_2,
									]}
									style={{
										width: 42,
										aspectRatio: 1,
										alignItems: "center",
										justifyContent: "center",
										backgroundColor: colors.primary,
										borderRadius: 10,
									}}
								>
									<Ionicons
										name="send"
										size={20}
										color={"white"}
									/>
								</LinearGradient>
							</CustomTouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				</Modal>

				<View
					style={{
						height,
					}}
				>
					<View
						style={{
							paddingVertical: 10,
							paddingHorizontal: DIMENTIONS.APP_PADDING,
							flexDirection: "row",
							gap: 20,
						}}
					>
						<View style={{ flex: 1 }}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 6,
								}}
							>
								<FontAwesome6
									name="location-dot"
									color="red"
									size={20}
								/>
								<Text
									style={{
										fontSize: 22,
										fontWeight: "500",
									}}
									numberOfLines={2}
								>
									梅田スカイビル
								</Text>
							</View>
							<Text
								style={{
									marginTop: 4,
									color: colors.subGray,
									marginLeft: 22,
								}}
							>
								Lat: 30,23, Long: 60, 50
							</Text>
						</View>
						<View>
							<OptionModal
								options={[
									{
										label: "グリッドビュー",
										icon: (
											<Ionicons
												name="grid-outline"
												size={16}
											/>
										),
										action: () => setViewType("grid"),
									},
									{
										label: "投稿ビュー",
										icon: (
											<MaterialCommunityIcons
												name="post-outline"
												size={16}
											/>
										),
										action: () => setViewType("post"),
									},
								]}
							/>
						</View>
					</View>

					<NativeViewGestureHandler>
						{viewType === "grid" ? (
							<FlatList
								key={viewType}
								data={DATA}
								numColumns={3}
								style={{ flex: 1 }}
								columnWrapperStyle={{ gap: 4 }}
								contentContainerStyle={{
									paddingHorizontal: DIMENTIONS.APP_PADDING,
									paddingBottom: 200,
									gap: 4,
								}}
								keyExtractor={(_, index) => String(index)}
								renderItem={({ item }) => (
									<CustomTouchableOpacity>
										<Image
											source={{
												uri: "https://i.pinimg.com/736x/5d/84/64/5d846442f240aa51c89def1983ca749b.jpg",
											}}
											style={{
												width: itemWidth,
												aspectRatio: 1,
												borderRadius: 5,
											}}
										/>
									</CustomTouchableOpacity>
								)}
							/>
						) : (
							// post view 
							<FlatList
								key={viewType}
								data={DATA}
								contentContainerStyle={{
									paddingHorizontal: DIMENTIONS.APP_PADDING,
									gap: 20,
									paddingBottom: 200,
								}}
								renderItem={({ item }) => (
									<View>
										<CustomTouchableOpacity
											onPress={() =>
												setShowPostModal(true)
											}
										>
											<Image
												source={{
													uri: "https://i.pinimg.com/736x/5d/84/64/5d846442f240aa51c89def1983ca749b.jpg",
												}}
												style={{
													width:
														width -
														DIMENTIONS.APP_PADDING *
															2,
													aspectRatio: 1,
													borderRadius: 15,
												}}
											/>
										</CustomTouchableOpacity>
										<View>
											<View
												style={{
													flexDirection: "row",
													marginTop: 8,
													paddingHorizontal: 10,
													alignItems: "center",
													justifyContent:
														"space-between",
												}}
											>
												<View>
													<Text
														style={{
															color: colors.subGray,
															fontSize: 12,
														}}
													>
														2022/10/19
													</Text>
													<Text
														style={{
															fontSize: 16,
															fontWeight: "500",
														}}
													>
														MeowCopter
													</Text>
												</View>
												<View
													style={{
														flexDirection: "row",
														gap: 12,
														alignItems: "center",
													}}
												>
													<AntDesign
														name="heart"
														size={24}
														color={"red"}
													/>
													<Ionicons
														name="share-outline"
														size={26}
														color={colors.subGray}
														style={{
															marginTop: -2,
														}}
													/>
												</View>
											</View>
										</View>
									</View>
								)}
							/>
						)}
					</NativeViewGestureHandler>
				</View>
			</ActionSheet>
		</>
	);
};

export default MapScreen;
