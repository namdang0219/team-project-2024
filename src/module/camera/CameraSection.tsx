import { View, Text, StyleSheet } from "react-native";
import React, { RefObject } from "react";
import { Camera, useCameraDevice } from "react-native-vision-camera";

import Reanimated from "react-native-reanimated";
import { ICameraScreen } from "screen/app/global/CameraScreen";

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
	exposure: true,
});

type CameraSectionProps = {
	cameraSide: ICameraScreen["cameraSide"];
	cameraRef: RefObject<Camera>;
	exposureValue: number;
};

const CameraSection = ({
	cameraSide,
	cameraRef,
	exposureValue,
}: CameraSectionProps) => {
	const device: any = useCameraDevice(cameraSide, {
		physicalDevices: [
			"ultra-wide-angle-camera",
			"wide-angle-camera",
			"telephoto-camera",
		],
	});

	if (!device) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={{ color: "white" }}>No devices found</Text>
			</View>
		);
	}

	return (
		<ReanimatedCamera
			ref={cameraRef}
			style={StyleSheet.absoluteFill}
			device={device}
			isActive={true}
			photo
			exposure={exposureValue * -0.01}
		/>
	);
};

export default CameraSection;
