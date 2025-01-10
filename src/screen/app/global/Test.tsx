import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useEffect, useState, useRef, Fragment } from "react";
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
import { ISticker } from "types/ISticker";

const { width } = Dimensions.get("screen");

export default function Test() {
	const [faces, setFaces] = useState<Face[]>([]);
	console.log("🚀 ~ Test ~ faces:", faces);

	const faceDetectionOptions = useRef<FaceDetectionOptions>({
		// Add your detection options here if needed
		landmarkMode: "all",
		autoScale: true,
		trackingEnabled: true,
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
		if (faces.length === 0) {
			// Không có khuôn mặt nào được phát hiện
			setFaces([]);
		} else {
			// Có khuôn mặt được phát hiện
			setFaces(faces);
		}
		// console.log("Detected faces:", faces);
	};

	const myFunctionJS = Worklets.createRunOnJS(handleDetectedFaces);

	// Frame processor
	const frameProcessor = useFrameProcessor(
		(frame) => {
			"worklet";

			// Detect faces in the frame
			const detectedFaces = detectFaces(frame);

			// Process detected faces
			// Use runOnJS to process detected faces on the JS thread
			myFunctionJS(detectedFaces.length > 0 ? detectedFaces : []);
		},
		[detectFaces]
	);

	const imageSize = {
		width: width,
		height: (width / 9) * 16,
	};

	const demoStickers: ISticker[] = [
		{
			asid: "1",
			type: "ar",
			stickerType: "glasses",
			faceAnchor: "forehead",
			sizeRatio: 1,
			offset: { x: 0, y: 0 },
			rotation: 0,
			source: "https://static.vecteezy.com/system/resources/thumbnails/046/567/799/small/american-glasses-sticker-png.png",
		},
	];

	return (
		<View style={{ flex: 1, position: "relative" }}>
			{!!device ? (
				<Camera
					style={StyleSheet.absoluteFill}
					device={device}
					isActive={true}
					frameProcessor={frameProcessor}
					fps={24} // Adjust FPS if needed
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
			{faces.length > 0 &&
				faces.map((face, index) => (
					<View key={index}>
						{demoStickers.map((sticker) => (
							<Image
								key={sticker.asid}
								source={{ uri: sticker.source }}
								style={{
									position: "absolute",
									resizeMode: "contain",
									top: face.bounds.y * imageSize.height + 45,
									left: face.bounds.x * imageSize.width,
									width: face.bounds.width * imageSize.width,
									height:
										face.bounds.height * imageSize.height,
									transform: [
										{ rotateY: `${face.yawAngle}deg` },
										{ rotateX: `${face.pitchAngle}deg` },
										{ rotate: `${-face.rollAngle}deg` },
									],
								}}
							/>
						))}
					</View>
				))}
		</View>
	);
}
