import {
	View,
	StatusBar,
	Dimensions,
	Image,
	useColorScheme,
} from "react-native";
import React, {
	Dispatch,
	RefObject,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import Gallery, { GalleryRef } from "react-native-awesome-gallery";
import { IImage } from "types/IImage";
import { DIMENTIONS } from "constant/dimention";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomTouchableOpacity } from "components/custom";
import Animated, {
	FadeIn,
	FadeInUp,
	ZoomIn,
	ZoomInDown,
	ZoomOut,
} from "react-native-reanimated";
import { OptionModal } from "components/modal";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { AutoHeightImage } from "components/image";
import { useTheme } from "@react-navigation/native";
import { useImageColors } from "hook/useImageColors";

const { width } = Dimensions.get("screen");

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const ImageViewScreen = ({
	imageIds,
	setShowImageModal,
	imageModalImageId,
}: {
	imageIds: string[];
	setShowImageModal: Dispatch<SetStateAction<boolean>>;
	imageModalImageId: number;
}) => {
	const insets = useSafeAreaInsets();
	const { colors } = useTheme();
	const images = useSelector((state: RootState) => state.image);
	const scheme = useColorScheme();

	const imageData = images.filter((i: IImage) => imageIds.includes(i.iid));
	const imageUrls = imageData.map((i: IImage) => i.uri);

	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

	// const imageColors = useImageColors(imageUrls[currentImageIndex]);
	// console.log("🚀 ~ imageColors:", imageColors);

	// Hàm kiểm tra độ sáng của màu (chuyển HEX -> RGB -> tính toán độ sáng)
	// const isColorBright = (hex: string) => {
	// 	const rgb = hexToRgb(hex);
	// 	if (!rgb) return false;
	// 	const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
	// 	return brightness > 128; // Giá trị 128 là ngưỡng sáng/tối
	// };

	// // Hàm chuyển HEX thành RGB
	// const hexToRgb = (hex: string) => {
	// 	const sanitizedHex = hex.replace("#", "");
	// 	const bigint = parseInt(sanitizedHex, 16);
	// 	const r = (bigint >> 16) & 255;
	// 	const g = (bigint >> 8) & 255;
	// 	const b = bigint & 255;
	// 	return { r, g, b };
	// };

	const galleryRef = useRef<GalleryRef>(null);

	useEffect(() => {
		galleryRef.current?.setIndex(imageModalImageId);
		setCurrentImageIndex(imageModalImageId);
	}, [imageModalImageId]);

	return (
		<>
			<StatusBar
				barStyle={scheme == "dark" ? "light-content" : "dark-content"}
			/>
			<View style={{ flex: 1, position: "relative" }}>
				<AnimatedBlurView
					intensity={20}
					style={{
						position: "absolute",
						paddingTop: insets.top,
						width,
						top: 0,
						left: 0,
						zIndex: 1000,
					}}
					entering={FadeInUp.duration(600).delay(50)}
				>
					<View
						style={{
							height: DIMENTIONS.HEADER_HEIGHT,
							paddingHorizontal: DIMENTIONS.APP_PADDING,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							opacity: 0.75,
						}}
					>
						{/* left container  */}
						<CustomTouchableOpacity
							onPress={() => setShowImageModal(false)}
						>
							<Feather name="x" size={24} color={colors.text} />
						</CustomTouchableOpacity>

						{/* right container  */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 20,
							}}
						>
							<CustomTouchableOpacity>
								<Feather
									name="edit"
									size={22}
									color={colors.text}
								/>
							</CustomTouchableOpacity>
							<CustomTouchableOpacity>
								<MaterialCommunityIcons
									name="tag-outline"
									size={24}
									color={colors.text}
								/>
							</CustomTouchableOpacity>
							<OptionModal
								options={[
									{
										label: "写真を削除",
										action: () => null,
										icon: (
											<Ionicons
												name="trash-outline"
												size={20}
											/>
										),
									},
								]}
								iconStyle={{ color: colors.text }}
							/>
						</View>
					</View>
				</AnimatedBlurView>
				<Gallery
					ref={galleryRef}
					data={imageUrls}
					onSwipeToClose={() => setShowImageModal(false)}
					loop
					onIndexChange={(newIndex) => {
						// console.log(newIndex);
						setCurrentImageIndex(newIndex);
					}}
					style={{
						backgroundColor: colors.background,
					}}
					renderItem={({ item }) => (
						<Animated.View
							style={{
								backgroundColor: colors.background,
								flex: 1,
								justifyContent: "center",
							}}
							entering={ZoomIn.duration(200)}
							exiting={ZoomOut}
						>
							<AutoHeightImage source={{ uri: item }} />
						</Animated.View>
					)}
				/>
			</View>
		</>
	);
};

export default ImageViewScreen;
