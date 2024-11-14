import React, { useState, useEffect, useRef } from "react";
import {
	Alert,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location";
import { CustomTouchableOpacity } from "components/custom";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

	const [region, setRegion] = useState(initialRegion);
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
			// Yêu cầu quyền truy cập vị trí
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Permission to access location was denied");
				return;
			}

			// Lấy vị trí hiện tại
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
		console.log("Component did mount");
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
	});

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
				// textStyle={{ color: "#bc8b00" }}
				// containerStyle={{
				// 	backgroundColor: "white",
				// 	borderColor: "#BC8B00",
				// }}
			>
				{/* {markers.map(renderMarker)}
			{children || null} */}
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
		</>
	);
};

export default MapScreen;
