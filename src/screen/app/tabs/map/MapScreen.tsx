import { View, Text, StyleSheet } from "react-native";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
	const mapRef = useRef<MapView | null>(null);
	const [location, setLocation] = useState<any>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const onRegionChanged = (region: any) => {
		console.log(region);
	};

	const initialLocation: Region = location
		? {
				latitude: location.coords.latitude,
				longitude: location.coords.longtitude,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
		  }
		: {
				latitude: 34.72191620480492,
				longitude: 135.4824555830412,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
		  };

	const getLocationPermission = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied");
			return;
		}

		let userLocation = await Location.getCurrentPositionAsync({});
		setLocation(userLocation);
	};

	useEffect(() => {
		getLocationPermission();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<MapView
				ref={mapRef}
				// provider={PROVIDER_GOOGLE}
				style={{ flex: 1 }}
				initialRegion={initialLocation}
				showsUserLocation
				showsMyLocationButton
				// onRegionChangeComplete={onRegionChanged}
			/>
		</View>
	);
}

// {"coords": {"accuracy": 5, "altitude": 0, "altitudeAccuracy": -1, "heading": -1, "latitude": 37.33233141, "longitude": -122.0312186, "speed": 0}, "timestamp": 1731202488176.502}
