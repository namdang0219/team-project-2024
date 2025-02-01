import {
	View,
	Text,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Animated,
	Modal,
	Pressable,
	TextInput,
	FlatList,
	Image,
	PanResponder,
	useWindowDimensions,
	ActivityIndicator,
} from "react-native";
import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { IImage } from "types/IImage";
import { darkTheme } from "util/theme/themeColors";
import { CustomTouchableOpacity } from "components/custom";
import { IconRedo, IconUndo } from "icon/camera-edit/drawPad";
import {
	IconDraw,
	IconEffect,
	IconImage,
	IconSticker,
	IconText,
} from "icon/camera-edit/add-item";
import { Canvas, Path, Skia, SkPath } from "@shopify/react-native-skia";
import {
	IconColorFilter,
	IconLocation,
	IconPlus,
	IconSlider,
	IconTag,
} from "icon/camera-edit";
import EffectModal from "module/camera/EffectModal";
import { BlurView } from "expo-blur";
import { recentStickers, stickerList } from "mock/stickerMocks";
import GridSection from "module/camera/GridSection";
import { useToggle } from "hook/useToggle";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { ISticker } from "types/ISticker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AutoHeightImage } from "components/image";
import { customStyle } from "style/customStyle";
import { useTheme } from "@react-navigation/native";
import { captureRef } from "react-native-view-shot";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../../../firebaseConfig";
import { getBlobFromUri } from "util/func/getBlobFromUri";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useAlbum } from "context/album-context";
import { Toast } from "toastify-react-native";
import { Sticker } from "module/camera/CaptureArea";

const ImageEditScreen = ({
	selectedImageData,
	setEditModalOpen,
	editModalOpen,
}: {
	selectedImageData: IImage | undefined;
	setEditModalOpen: Dispatch<SetStateAction<boolean>>;
	editModalOpen: boolean;
}) => {
	const { width: screenWidth, height } = useWindowDimensions();
	const { colors } = useTheme();

	// toggle function to toggle show and hide (have preview image)
	const [showAddItem, toggleShowAddItem, setShowAddItem] = useToggle(false);
	const [stikerModal, toggleStickerModal] = useToggle(false);
	const [drawPad, toggleDrawPad, setDrawPad] = useToggle(false);
	const [effectModal, toggleEffectModal] = useToggle(false);
	const viewRef = useRef<View>(null);
	const insets = useSafeAreaInsets();
	const [saving, setSaving] = useState<boolean>(false);

	const translateYAnim = useRef(new Animated.Value(75)).current;
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const padding = 14;

	const [stickers, setStickers] = useState<ISticker[]>([]);

	const addSticker = (stickerSource: string) => {
		setStickers([...stickers, { source: stickerSource, id: Date.now() }]);
	};

	const gap = 10;
	const numColumns = 4;

	const handleSaveImage = async () => {
		if (!selectedImageData?.iid || !selectedImageData?.album) return;
		try {
			setSaving(true);
			const capturedUri = await captureRef(viewRef, {
				format: "jpg",
				quality: 0.8,
			});
			const fileName = `${selectedImageData?.iid}.jpg`;
			const fileRef = ref(storage, `0_photos/${fileName}`);
			const imageBlob = await getBlobFromUri(capturedUri);
			await uploadBytes(fileRef, imageBlob as Blob);
			await updateDoc(doc(db, "0_images", selectedImageData?.iid), {
				update_at: Date.now(),
			});
			await updateDoc(doc(db, "0_albums", selectedImageData?.album), {
				update_at: Date.now(),
			});

			Toast.success("更新ずみ");
			setEditModalOpen(false);
		} catch (error) {
			console.error("Something went wrong!", error);
		} finally {
			setSaving(false);
		}
	};

	const availableSpace = screenWidth - (numColumns - 1) * gap - padding * 2;
	const itemSize = availableSpace / numColumns;

	useEffect(() => {
		if (showAddItem) {
			Animated.parallel([
				// container anim
				Animated.timing(translateYAnim, {
					toValue: -10,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 300,
					delay: 150,
					useNativeDriver: true,
				}),
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(translateYAnim, {
					toValue: 75,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(fadeAnim, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start();
		}
	}, [showAddItem]);

	// handle drawpad with skia
	const [paths, setPaths] = useState<SkPath[]>([]); // save all paths
	const [redoPaths, setRedoPaths] = useState<SkPath[]>([]); // save paths was undo
	const [currentPath, setCurrentPath] = useState<SkPath | null>(null); // current path

	// start new path when drawing
	const startPath = (x: number, y: number) => {
		const newPath = Skia.Path.Make();
		newPath.moveTo(x, y);
		setCurrentPath(newPath);
	};

	// update path when move finger
	const updatePath = (x: number, y: number) => {
		if (currentPath) {
			currentPath.lineTo(x, y);
			setCurrentPath(currentPath.copy()); // update path to current path
		}
	};

	// finish path and save to current path
	const endPath = () => {
		if (currentPath) {
			setPaths([...paths, currentPath]);
			setCurrentPath(null);
			setRedoPaths([]); // Reset redoPaths when have new path created
		}
	};

	// undo last path
	const undo = () => {
		if (paths.length > 0) {
			const newPaths = [...paths];
			const lastPath = newPaths.pop();
			setPaths(newPaths);
			if (lastPath) setRedoPaths([...redoPaths, lastPath]);
		}
	};

	// redo path when undo ed
	const redo = () => {
		if (redoPaths.length > 0) {
			const newRedoPaths = [...redoPaths];
			const restoredPath = newRedoPaths.pop();
			setRedoPaths(newRedoPaths);
			if (restoredPath) setPaths([...paths, restoredPath]);
		}
	};

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderGrant: (evt) => {
			const { locationX, locationY } = evt.nativeEvent;
			startPath(locationX, locationY);
		},
		onPanResponderMove: (evt) => {
			const { locationX, locationY } = evt.nativeEvent;
			updatePath(locationX, locationY);
		},
		onPanResponderRelease: endPath,
	});

	const styles = StyleSheet.create({
		cameraContainer: {
			backgroundColor: darkTheme.colors.background,
			aspectRatio: "9/16",
			borderRadius: 15,
			overflow: "hidden",
			position: "relative",
			alignItems: "center",
			justifyContent: "center",
		},
		cameraFeatureContainer: {
			position: "absolute",
			top: 0,
			left: 0,
			zIndex: 10,
			aspectRatio: "9/16",
			width: screenWidth,
		},
		featureItem: {
			width: 40,
			alignItems: "center",
			justifyContent: "center",
		},
		itemContainer: {
			backgroundColor: "white",
			width: 48,
			height: 48,
			borderRadius: 1000,
			alignItems: "center",
			justifyContent: "center",
		},
	});

	if (!selectedImageData) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text>エラーが発生しました</Text>
			</View>
		);
	}

	return (
		<View style={{ backgroundColor: "black", flex: 1 }}>
			<StatusBar barStyle={"light-content"} />
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: darkTheme.colors.background,
				}}
			>
				<View style={styles.cameraContainer}>
					<View style={styles.cameraFeatureContainer}>
						<View style={{ position: "relative", flex: 1 }}>
							<View
								style={[
									{
										height: 50,
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
										paddingHorizontal: 10,
										zIndex: 1000,
									},
								]}
							>
								{/* x mark  */}
								<CustomTouchableOpacity
									onPress={() => {
										setEditModalOpen(false);
									}}
									style={{ width: 50 }}
								>
									<Feather
										name="x"
										size={30}
										color={"white"}
										style={customStyle.shadow}
									/>
								</CustomTouchableOpacity>
								{/* image flip  */}
								<CustomTouchableOpacity>
									<MaterialCommunityIcons
										name="flip-horizontal"
										size={26}
										color={"white"}
										style={customStyle.shadow}
									/>
								</CustomTouchableOpacity>
								{/* save button  */}
								<CustomTouchableOpacity
									onPress={handleSaveImage}
									style={{ width: 50 }}
								>
									<View style={{ marginLeft: "auto" }}>
										{!saving ? (
											<Text
												style={[
													{
														color: "white",
														fontSize: 18,
													},
													customStyle.shadow,
												]}
											>
												保存
											</Text>
										) : (
											<ActivityIndicator />
										)}
									</View>
								</CustomTouchableOpacity>
							</View>

							{/* draw pad  */}
							{drawPad && (
								<View
									style={[
										StyleSheet.absoluteFill,
										{ zIndex: 1000 },
									]}
									{...panResponder.panHandlers}
								>
									<CustomTouchableOpacity
										style={{
											position: "absolute",
											bottom: 10,
											left: screenWidth / 2 - 40,
											zIndex: 100,
										}}
										onPress={undo}
										disabled={paths.length === 0}
									>
										<IconUndo style={customStyle.shadow} />
									</CustomTouchableOpacity>
									<CustomTouchableOpacity
										style={{
											position: "absolute",
											bottom: 10,
											right: screenWidth / 2 - 40,
											zIndex: 100,
										}}
										onPress={redo}
										disabled={redoPaths.length === 0}
									>
										<IconRedo style={customStyle.shadow} />
									</CustomTouchableOpacity>
								</View>
							)}

							{/* add item  */}
							<Animated.View
								style={[
									{
										flexDirection: "row",
										position: "absolute",
										bottom: 0,
										width: 320,
										left: "50%",
										justifyContent: "space-between",
										zIndex: 1000,
									},
									{
										transform: [
											{ translateX: -160 },
											{ translateY: translateYAnim },
										],
										opacity: fadeAnim,
									},
								]}
							>
								<CustomTouchableOpacity
									style={[
										styles.itemContainer,
										{
											transform: [{ translateY: -16 }],
										},
									]}
								>
									<IconImage gradient />
								</CustomTouchableOpacity>
								<CustomTouchableOpacity
									style={[
										styles.itemContainer,
										{
											transform: [{ translateY: -5 }],
										},
									]}
								>
									<IconText gradient />
								</CustomTouchableOpacity>
								<CustomTouchableOpacity
									style={[
										styles.itemContainer,
										{
											transform: [{ translateY: -0 }],
										},
									]}
								>
									<IconEffect gradient />
								</CustomTouchableOpacity>
								<CustomTouchableOpacity
									style={[
										styles.itemContainer,
										{
											transform: [{ translateY: -5 }],
										},
									]}
									onPress={() => {
										// setPath(Skia.Path.Make());
										toggleDrawPad();
										setShowAddItem(false);
									}}
								>
									<IconDraw gradient />
								</CustomTouchableOpacity>
								<CustomTouchableOpacity
									onPress={() => {
										toggleStickerModal();
										setDrawPad(false);
									}}
									style={[
										styles.itemContainer,
										{
											transform: [{ translateY: -16 }],
										},
									]}
								>
									<IconSticker gradient />
								</CustomTouchableOpacity>
							</Animated.View>

							{selectedImageData.uri && (
								<View
									style={[
										StyleSheet.absoluteFill,
										{
											aspectRatio: "9/16",
											width: screenWidth,
											alignItems: "center",
											justifyContent: "center",
										},
									]}
								>
									<View ref={viewRef}>
										<AutoHeightImage
											width={screenWidth}
											style={{
												backgroundColor: "#0000003d",
											}}
											source={{
												uri: selectedImageData.uri,
											}}
										></AutoHeightImage>
										{/* drawed pad  */}
										<Canvas
											style={[StyleSheet.absoluteFill]}
										>
											{paths.map((path, index) => (
												<Path
													key={index}
													path={path}
													color="white"
													style="stroke"
													strokeWidth={3}
												/>
											))}
											{currentPath && (
												<Path
													path={currentPath}
													color="white"
													style="stroke"
													strokeWidth={3}
												/>
											)}
										</Canvas>
									</View>

									{/* sticker field  */}
									<>
										{stickers &&
											stickers.map((sticker) => (
												<Sticker
													key={sticker.id}
													source={sticker.source}
												/>
											))}
									</>
								</View>
							)}
						</View>
					</View>
				</View>

				{/* camera features - bottom container - image is string  */}
				{selectedImageData.uri && (
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							flex: 1,
							marginHorizontal: 40,
							opacity: 0.85,
						}}
					>
						<CustomTouchableOpacity style={styles.featureItem}>
							<IconColorFilter gradient={false} />
						</CustomTouchableOpacity>
						<CustomTouchableOpacity style={styles.featureItem}>
							<IconSlider gradient={false} />
						</CustomTouchableOpacity>
						<CustomTouchableOpacity
							style={styles.featureItem}
							onPress={toggleShowAddItem}
							// onPress={toggleStickerModal}
						>
							<IconPlus gradient={showAddItem} />
						</CustomTouchableOpacity>
						<CustomTouchableOpacity style={styles.featureItem}>
							<IconTag gradient={false} />
						</CustomTouchableOpacity>
						<CustomTouchableOpacity style={styles.featureItem}>
							<IconLocation gradient={false} />
						</CustomTouchableOpacity>
					</View>
				)}
			</SafeAreaView>
			{/* modal  */}
			<EffectModal
				showEffectModal={effectModal}
				setShowEffectModal={toggleEffectModal}
			/>
			{/* sticker modal  */}
			<Modal
				transparent={true}
				visible={stikerModal}
				animationType="slide"
				onRequestClose={toggleStickerModal}
			>
				<View style={{ flex: 1, backgroundColor: "transparent" }}>
					{/* backdrop  */}
					<Pressable
						style={{ height: insets.top }}
						onPress={toggleStickerModal}
					/>

					<BlurView
						tint="dark"
						style={{
							overflow: "hidden",
							flex: 1,
							borderTopLeftRadius: 15,
							borderTopRightRadius: 15,
							backgroundColor: "rgba(0,0,0,0.35)",
						}}
					>
						{/* cancel button  */}
						<View
							style={{
								height: 40,
								alignItems: "center",
								paddingLeft: 14,
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<CustomTouchableOpacity
								onPress={toggleStickerModal}
							>
								<Text style={{ color: "white", fontSize: 16 }}>
									キャンセル
								</Text>
							</CustomTouchableOpacity>
						</View>

						{/* content  */}
						<View>
							{/* search input field  */}
							<View
								style={{
									marginHorizontal: 14,
									position: "relative",
								}}
							>
								<TextInput
									placeholder="ステッカーを検索"
									placeholderTextColor={"#9ca3af"}
									style={{
										backgroundColor:
											"rgba(255,255,255,0.15)",
										height: 35,
										paddingHorizontal: 14,
										borderRadius: 6,
										color: "white",
									}}
								/>
								<Feather
									name="search"
									size={20}
									style={{
										position: "absolute",
										right: 10,
										top: 7,
										color: "white",
									}}
								/>
							</View>

							{/* sticker list  */}
							<View style={{ marginTop: 10 }}>
								<FlatList
									data={stickerList || []}
									ListHeaderComponent={
										<View style={{ gap }}>
											<Text
												style={{
													color: "white",
												}}
											>
												最近使用したステッカー
											</Text>
											<View
												style={{
													flexDirection: "row",
													flexWrap: "wrap",
													gap,
												}}
											></View>
											<Text
												style={{
													color: "white",
												}}
											>
												ステッカー一覧
											</Text>
										</View>
									}
									contentContainerStyle={{
										paddingHorizontal: padding,
										gap,
										paddingBottom: 150,
									}}
									columnWrapperStyle={{ gap }}
									numColumns={numColumns}
									renderItem={({ item }) => (
										<CustomTouchableOpacity
											key={item.id}
											onPress={() => {
												// addSticker(item.source);
												toggleStickerModal();
												setShowAddItem(false);
											}}
										>
											<Image
												source={{
													uri: item.source,
												}}
												style={{
													width: itemSize,
													height: itemSize,
													objectFit: "contain",
												}}
											/>
										</CustomTouchableOpacity>
									)}
								/>
							</View>
						</View>
					</BlurView>
				</View>
			</Modal>
		</View>
	);
};

export default ImageEditScreen;
