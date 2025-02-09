import {
	View,
	Image,
	StyleSheet,
	useWindowDimensions,
	LogBox,
} from "react-native";
import React, { FC } from "react";
import { TrackingStickerType } from "../CameraScreen";
import { Face } from "react-native-vision-camera-face-detector";

type CameraViewTrackingStickerProps = {
	currentTrackingSticker: TrackingStickerType | null;
	faces: Face[];
};

const CameraViewTrackingSticker: FC<CameraViewTrackingStickerProps> = ({
	currentTrackingSticker,
	faces,
}) => {
	const { width } = useWindowDimensions();
	const containerSize = {
		width: width,
		height: (width / 9) * 16,
	};
	LogBox.ignoreLogs([
		'Each child in a list should have a unique "key" prop.',
	]);

	return (
		<View style={[StyleSheet.absoluteFill]}>
			<View
				style={{
					flex: 1,
					position: "relative",
				}}
			>
				{currentTrackingSticker &&
					faces.length > 0 &&
					faces.map(
						(
							face, // currentTrackingSticker
							index
						) => (
							<>
								<View
									key={index}
									style={{
										position: "absolute",
										width:
											containerSize.width *
											face.bounds.width,
										height:
											containerSize.height *
											face.bounds.height,
										top:
											face.bounds.y *
												containerSize.height +
											(currentTrackingSticker?.offsetY ||
												0) *
												containerSize.height, // Thêm offsetY
										left:
											face.bounds.x *
												containerSize.width +
											(currentTrackingSticker?.offsetX ||
												0) *
												containerSize.width, // Thêm offsetX

										transform: [
											{
												rotateY: `${face.yawAngle}deg`,
											},
											{
												rotateX: `${face.pitchAngle}deg`,
											},
											{
												rotate: `${
													-face.rollAngle +
													(currentTrackingSticker?.rotate ||
														0)
												}deg`,
											},
											{
												scale: Math.min(
													((currentTrackingSticker?.scale ||
														1) *
														(face.bounds.width *
															containerSize.width)) /
														100,
													1.5
												),
											},
										],
									}}
								>
									<Image
										source={{
											uri: currentTrackingSticker.uri,
										}}
										resizeMode="contain"
										style={{
											width: "100%",
											height: "100%",
										}}
									/>
								</View>
							</>
						)
					)}
			</View>
		</View>
	);
};

export default CameraViewTrackingSticker;
