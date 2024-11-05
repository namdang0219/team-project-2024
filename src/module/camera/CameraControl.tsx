import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import { CustomTouchableOpacity } from "components/custom";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

type CameraControlProps = {
	cameraRef: any;
	flash: boolean;
	setPreviewPhotoUri: (uri: string) => void;
	setShowEffectModal: (visible: boolean) => void;
};

const CameraControl = ({
	cameraRef,
	flash,
	setPreviewPhotoUri,
	setShowEffectModal,
}: CameraControlProps) => {
	const { width } = useWindowDimensions();

	const takePhoto = async () => {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePhoto({
				flash: flash ? "on" : "off",
				enableShutterSound: false,
			});
			setPreviewPhotoUri(photo.path);
		}
	};
	const styles = StyleSheet.create({
		cameraControl: {
			flexDirection: "row",
			justifyContent: "center",
			bottom: 10,
			position: "absolute",
			alignItems: "center",
			width: width,
			zIndex: 1000,
		},

		shutterButton: {
			width: 66,
			aspectRatio: "1/1",
			borderWidth: 5,
			borderColor: "white",
			borderRadius: 1000,
			marginHorizontal: "auto",
		},
	});

	return (
		<View style={styles.cameraControl}>
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
			<CustomTouchableOpacity onPress={() => setShowEffectModal(true)}>
				<MaterialIcons
					name="face-retouching-natural"
					size={30}
					color={"white"}
				/>
			</CustomTouchableOpacity>
		</View>
	);
};

export default CameraControl;
