import React, { useState, useEffect, useRef } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Region, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { CustomTouchableOpacity } from "components/custom";
import { useTheme } from "@react-navigation/native";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { GLOBAL_GRADIENT } from "util/theme/themeColors";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import styles from "toastify-react-native/components/styles";

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

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

	const [ready, setReady] = useState(true);

	const setMapRegion = (newRegion: Region) => {
		if (ready && mapRef.current) {
			setTimeout(
				() =>
					mapRef.current && mapRef.current.animateToRegion(newRegion),
				10
			);
		}
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
				// onRegionChange={onRegionChange}
				onRegionChangeComplete={onRegionChangeComplete}
				style={StyleSheet.absoluteFill}
			>

				<Marker
					coordinate={{
						latitude: 37.787094190061325,
						longitude: -122.40435593090945,
					}}
					style={{
						// backgroundColor: "cyan",
						transform: [{ translateX: 30 }, {translateY: -20}],
					}}
				>
					<CustomTouchableOpacity
						onPress={() => console.log("pressed")}
						style={{
							position: "relative",
							width: 92,
							height: 92,
							alignItems: "center",
							justifyContent: "center",
							transform: [{ translateX: -30 }, {translateY: 20}],
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
			</MapView>
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
		</>
	);
};

export default MapScreen;
