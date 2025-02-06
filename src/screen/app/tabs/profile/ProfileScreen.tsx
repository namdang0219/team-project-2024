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
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
	const insets = useSafeAreaInsets();
	const [qrCodeModal, , setQrCodeModal] = useToggle(false);
	const { navigate } = useNavigation<any>();

	const [qrCodeModalState, setQrCodeModalState] =
		useState<QrCodeModalState>("user-found");

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
						<CustomTouchableOpacity
							onPress={() => navigate("SettingScreen")}
						>
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
