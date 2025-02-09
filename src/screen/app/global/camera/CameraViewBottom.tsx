import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	Image,
	StyleSheet,
} from "react-native";
import React, {
	Dispatch,
	FC,
	RefObject,
	SetStateAction,
	useRef,
} from "react";
import { CustomTouchableOpacity } from "components/custom";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { CUSTOM_STYLES } from "style/customStyle";
import ActionSheet, {
	ActionSheetRef,
	FlatList,
} from "react-native-actions-sheet";
import { DIMENTIONS } from "constant/dimention";
import { darkTheme } from "util/theme/themeColors";
import { trackingStickerList } from "mock/stickerMocks";
import { useItemWidth } from "hook/useItemWidth";
import { TrackingStickerType } from "../CameraScreen";
import { Camera } from "react-native-vision-camera";
import { captureRef } from "react-native-view-shot";

const { width } = Dimensions.get("screen");
const STICKER_ITEM_GAP = 10;

type CameraViewBottomProps = {
	cameraRef: RefObject<Camera>;
	viewRef: RefObject<View>;
	setCurrentTrackingSticker: Dispatch<
		SetStateAction<TrackingStickerType | null>
	>;
	setPreviewPhotoUri: Dispatch<SetStateAction<string>>;
	flash: boolean;
	setIsCameraVisible: Dispatch<SetStateAction<boolean>>;
	setCapturedPhoto: Dispatch<SetStateAction<string>>;
};

const CameraViewBottom: FC<CameraViewBottomProps> = ({
	cameraRef,
	viewRef,
	setCurrentTrackingSticker,
	setPreviewPhotoUri,
	flash,
	setIsCameraVisible,
	setCapturedPhoto,
}) => {
	const stickerItemWidth = useItemWidth(STICKER_ITEM_GAP, 4);
	const trackingStickerSheetRef = useRef<ActionSheetRef>(null);
	// const handleCaptureImage = async () => {
	// 	if (viewRef.current) {
	// 		try {
	// 			const capturedUri = await captureRef(viewRef, {
	// 				format: "jpg",
	// 				quality: 0.8,
	// 			});
	// 			setPreviewPhotoUri(capturedUri);
	// 		} catch (error) {
	// 			console.error("Something went wrong!", error);
	// 		}
	// 		setCurrentTrackingSticker(null);
	// 	}
	// };

	const handleCaptureImage = async () => {
		if (cameraRef.current) {
			try {
				const photo = await cameraRef?.current.takePhoto({
					flash: flash ? "on" : "off",
				});

				setCapturedPhoto(photo.path);
				setIsCameraVisible(false);

				setTimeout(async () => {
					if (viewRef.current) {
						const capturedUri = await captureRef(viewRef, {
							format: "jpg",
							quality: 1,
						});

						setPreviewPhotoUri(capturedUri); // Ảnh hoàn chỉnh
					}
				}, 400); // Đợi một chút để UI update
			} catch (error) {
				console.error("Something went wrong!", error);
			}
		}
	};

	const styles = StyleSheet.create({
		container: {
			position: "absolute",
			bottom: 10,
			left: 0,
			zIndex: 100,
			width,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			gap: 25,
		},
		captureButton: {
			width: 65,
			height: 65,
			borderColor: "white",
			borderRadius: 1000,
			borderWidth: 4,
			alignItems: "center",
			justifyContent: "center",
		},
		indicatorStyle: {
			backgroundColor: "white",
			height: 4,
			opacity: 0.6,
		},
		sheetTitle: {
			color: "white",
			fontSize: 18,
			textAlign: "center",
			fontWeight: "500",
		},
		containerStyle: {
			gap: STICKER_ITEM_GAP,
			paddingHorizontal: DIMENTIONS.APP_PADDING,
			paddingTop: DIMENTIONS.APP_PADDING,
			paddingBottom: 60,
		},
	});

	return (
		<>
			<View style={styles.container}>
				<CustomTouchableOpacity>
					<Ionicons
						name="color-filter-outline"
						color="white"
						size={30}
						style={CUSTOM_STYLES.shadow}
					/>
				</CustomTouchableOpacity>

				{/* capture button  */}
				<CustomTouchableOpacity
					style={styles.captureButton}
					onPress={handleCaptureImage}
				>
					<MaterialCommunityIcons
						name="camera-iris"
						size={40}
						color="white"
						style={CUSTOM_STYLES.shadow}
					/>
				</CustomTouchableOpacity>

				<CustomTouchableOpacity
					onPress={() => trackingStickerSheetRef.current?.show()}
				>
					<MaterialCommunityIcons
						name="face-man-shimmer-outline"
						color="white"
						size={30}
						style={CUSTOM_STYLES.shadow}
					/>
				</CustomTouchableOpacity>
			</View>

			{/* action sheet for tracking stickers */}
			<ActionSheet
				ref={trackingStickerSheetRef}
				gestureEnabled
				indicatorStyle={styles.indicatorStyle}
				containerStyle={{
					backgroundColor: darkTheme.colors.background,
					height: "50%",
				}}
			>
				<FlatList
					data={[...trackingStickerList]}
					numColumns={4}
					ListHeaderComponent={
						<Text style={styles.sheetTitle}>ステッカー</Text>
					}
					contentContainerStyle={styles.containerStyle}
					columnWrapperStyle={{ gap: STICKER_ITEM_GAP }}
					keyExtractor={(item, index) => String(item.sid + index)}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => {
								setCurrentTrackingSticker(item),
									trackingStickerSheetRef.current?.hide();
							}}
						>
							<Image
								source={{ uri: item.uri }}
								style={{
									width: stickerItemWidth,
									height: stickerItemWidth,
								}}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					)}
				/>
			</ActionSheet>
		</>
	);
};

export default CameraViewBottom;
