import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState, useRef } from "react";
import {
	Camera,
	useCameraDevice,
	useFrameProcessor,
} from "react-native-vision-camera";
import {
	Face,
	useFaceDetector,
	FaceDetectionOptions,
} from "react-native-vision-camera-face-detector";
import { Worklets } from "react-native-worklets-core";

export default function Test() {
	const faceDetectionOptions = useRef<FaceDetectionOptions>({
		// Add your detection options here if needed
	}).current;

	const device = useCameraDevice("front");
	const { detectFaces } = useFaceDetector(faceDetectionOptions);

	// Request camera permissions on mount
	useEffect(() => {
		(async () => {
			const status = await Camera.requestCameraPermission();
			console.log({ status });
		})();
	}, [device]);

	// Handle detected faces on the JS thread
	const handleDetectedFaces = (faces: Face[]) => {
		console.log("Detected faces:", faces);
	};

	const myFunctionJS = Worklets.createRunOnJS(handleDetectedFaces);

	// Frame processor
	const frameProcessor = useFrameProcessor(
		(frame) => {
			"worklet";

			// Detect faces in the frame
			const faces = detectFaces(frame);

			// Process detected faces
			if (faces.length > 0) {
				// Use runOnJS to process detected faces on the JS thread
				myFunctionJS(faces);
			}
		},
		[detectFaces]
	);

	return (
		<View style={{ flex: 1 }}>
			{!!device ? (
				<Camera
					style={StyleSheet.absoluteFill}
					device={device}
					isActive={true}
					frameProcessor={frameProcessor}
					fps={30} // Adjust FPS if needed
				/>
			) : (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text>No Device</Text>
				</View>
			)}
		</View>
	);
}
