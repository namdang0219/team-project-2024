import { View, Text, Button as RNButton } from "react-native";
import React, { useState } from "react";
import { CustomTouchableOpacity } from "components/custom";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Header from "layout/Header";
import { DIMENTIONS } from "constant/dimention";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToggle } from "hook/useToggle";
import { useCameraPermissions } from "expo-camera";
import ProfileTab from "module/profile/ProfileTab";
import QrCodeModal, { QrCodeModalState } from "module/profile/QrCodeModal";

const ProfileScreen = () => {
	const insets = useSafeAreaInsets();
	const [qrCodeModal, , setQrCodeModal] = useToggle(false);
	const [permission, requestPermission] = useCameraPermissions();

	const [qrCodeModalState, setQrCodeModalState] =
		useState<QrCodeModalState>("user-found");

	if (!permission) {
		// Camera permissions are still loading.
		return (
			<View style={{ flex: 1 }}>
				<Text>No Permissions to access camera!</Text>
			</View>
		);
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
				<Text>We need your permission to show the camera</Text>
				<RNButton
					onPress={requestPermission}
					title="grant permission"
				/>
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			{/* blur header  */}
			<Header
				title="Profile"
				rightContainer={
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 20,
						}}
					>
						<CustomTouchableOpacity
							onPress={() => setQrCodeModal(true)}
						>
							<Ionicons
								name="qr-code-outline"
								size={24}
								color="black"
							/>
						</CustomTouchableOpacity>
						<CustomTouchableOpacity>
							<AntDesign name="setting" size={26} color="black" />
						</CustomTouchableOpacity>

						{/* qr code dialog  */}
						<QrCodeModal
							qrCodeModal={qrCodeModal}
							qrCodeModalState={qrCodeModalState}
							setQrCodeModal={setQrCodeModal}
							setQrCodeModalState={setQrCodeModalState}
						/>
					</View>
				}
			/>

			{/* content  */}
			<View
				style={{
					paddingTop: insets.top + DIMENTIONS.HEADER_HEIGHT,
					flex: 1,
				}}
			>
				<ProfileTab />
			</View>
		</View>
	);
};

export default ProfileScreen;
