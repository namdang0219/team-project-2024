import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { TitleAuth } from "components/title";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "react-native-ui-lib";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Button } from "components/button";
import { DIMENTIONS } from "constant/dimention";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useCameraPermission } from "react-native-vision-camera";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

// Permission

const RequirePermisionsScreen = () => {
	const { colors } = useTheme();
	const { navigate } = useNavigation<any>();
	const [cameraPermission, setCameraPermission] = useState(false);
	const [libraryPermission, setLibraryPermission] = useState(false);
	const [locationPermission, setLocationPermission] = useState(false);

	// camera permission
	const { hasPermission, requestPermission: requestCameraPermission } =
		useCameraPermission();
	useEffect(() => {
		if (!hasPermission) {
			setCameraPermission(false);
			requestCameraPermission();
		} else {
			setCameraPermission(true);
		}
	}, [hasPermission]);

	// location permission
	useEffect(() => {
		async function checkLocationPermission() {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setLocationPermission(false);
				return;
			} else {
				setLocationPermission(true);
			}
		}
		checkLocationPermission();
	}, []);

	// library permissional
	const [status, requestPermission] =
		ImagePicker.useMediaLibraryPermissions();
	useEffect(() => {
		if (status?.granted === true) {
			setLibraryPermission(true);
		} else if (status?.granted === false) {
			setLibraryPermission(false);
			requestPermission();
		}
	}, [status]);

	return (
		<SafeAreaView
			style={{ flex: 1, paddingHorizontal: DIMENTIONS.AUTH_PADDING }}
		>
			<View
				style={{
					flex: 1,
					gap: 40,
				}}
			>
				<TitleAuth>アクセス許可</TitleAuth>
				<View style={{ gap: 10 }}>
					<View style={styles.permissionItemContainer}>
						<View style={styles.permissionItem}>
							<Checkbox
								value={hasPermission}
								color={colors.primary}
							/>
							<Text style={styles.permissionText}>
								カメラへのアクセス許可
							</Text>
						</View>
						<Feather name="camera" size={20} color={"#9CA3AF"} />
					</View>
					<View style={styles.permissionItemContainer}>
						<View style={styles.permissionItem}>
							<Checkbox
								value={libraryPermission}
								color={colors.primary}
							/>
							<Text style={styles.permissionText}>
								ライブラリーへのアクセス許可
							</Text>
						</View>
						<Ionicons
							name="albums-outline"
							size={22}
							color={"#9CA3AF"}
						/>
					</View>
					<View style={styles.permissionItemContainer}>
						<View style={styles.permissionItem}>
							<Checkbox
								value={locationPermission}
								color={colors.primary}
							/>
							<Text style={styles.permissionText}>
								位置情報へのアクセス許可
							</Text>
						</View>
						<Ionicons
							name="location-outline"
							size={22}
							color={"#9CA3AF"}
						/>
					</View>
				</View>
			</View>
			<Button
				onPress={() =>
					navigate("AlbumStack", {
						screen: "AlbumScreen",
					})
				}
				disabled={
					cameraPermission && libraryPermission && locationPermission
						? false
						: true
				}
			>
				次へ進む
			</Button>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	permissionItemContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	permissionItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	permissionText: {
		fontSize: 16,
	},
});

export default RequirePermisionsScreen;
