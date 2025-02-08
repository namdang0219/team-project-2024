import {
	View,
	StatusBar,
	Modal,
	Text,
	Dimensions,
	LogBox,
	useColorScheme,
} from "react-native";
import React, { useState } from "react";
import Header from "layout/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTouchableOpacity } from "components/custom";
import { useRoute, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";
import { useItemWidth } from "hook/useItemWidth";
import { DIMENTIONS } from "constant/dimention";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import { AlbumType } from "types/AlbumType";
import { ImageType } from "types/ImageType";
import * as FileSystem from "expo-file-system";
import { removeImage, updateAlbum } from "store/album/albumSlice";
import { AutoHeightImage } from "components/image";
import { OptionModal } from "components/modal";

const GAP = 4;
const { width } = Dimensions.get("screen");

const AlbumImageListScreen = () => {
	const scheme = useColorScheme();
	const insets = useSafeAreaInsets();
	const { params } = useRoute<any>();
	const albums = useSelector((state: RootState) => state.albums);
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user);
	const itemWidth = useItemWidth(GAP, 3, 0);
	const [showImageModal, setShowImageModal] = useState<boolean>(false);
	const [showingImage, setShowingImage] = useState<ImageType | null>(null);
	const { colors } = useTheme();
	LogBox.ignoreLogs(["Failed to get size for image file"]);

	const aid = params?.aid;
	const filteredAlbum = albums && albums.find((a: AlbumType) => aid == a.aid);
	console.log("🚀 ~ AlbumImageListScreen ~ filteredAlbum:", filteredAlbum);

	const pickImages = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [4, 3],
			quality: 1,
			allowsMultipleSelection: true,
		});

		if (!result.canceled) {
			if (!user) return;
			const newImages: ImageType[] = await Promise.all(
				result.assets.map(async (a, index) => {
					const fileName =
						a.fileName && a.fileName + index + Date.now();
					const newPath = `${FileSystem.documentDirectory}${fileName}`;

					await FileSystem.copyAsync({
						from: a.uri,
						to: newPath,
					});

					console.log("Image copied successfully");

					return {
						iid: `${a?.fileName}index` as string,
						album: filteredAlbum?.aid as string,
						author: user.uid,
						location: {
							lat: 0,
							long: 0,
						},
						source: {
							uri: newPath,
							fileName: a.uri.split("/").pop() as string,
						},
						create_at: Number(new Date()),
						update_at: Number(new Date()),
					};
				})
			);

			dispatch(
				updateAlbum({
					...(filteredAlbum as AlbumType),
					images: [
						...(filteredAlbum?.images as ImageType[]),
						...newImages,
					],
					update_at: Date.now(),
				})
			);

			Toast.success("写真追加済み");
		}
	};

	const deleteImageFromAlbum = async (imageId: string) => {
		try {
			if (!filteredAlbum) return;

			const imageToDelete = filteredAlbum.images.find(
				(img) => img.iid === imageId
			);
			if (!imageToDelete) return;

			await FileSystem.deleteAsync(imageToDelete.source.uri, {
				idempotent: true,
			});
			console.log("Image was deleted:", imageToDelete.source.uri);

			const updatedImages = filteredAlbum.images.filter(
				(img) => img.iid !== imageId
			);
			dispatch(
				removeImage({
					albumId: aid,
					imageId: showingImage?.iid as string,
				})
			);

			dispatch(
				updateAlbum({
					...filteredAlbum,
					update_at: Date.now(),
					images: updatedImages,
				})
			);
			setShowImageModal(false);
			Toast.success("写真を削除しました");
		} catch (error) {
			console.error("Lỗi khi xóa ảnh:", error);
			Toast.error("削除失敗");
		}
	};

	if (!filteredAlbum) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>アルバムが見つかりません</Text>
			</View>
		);
	}

	return (
		<>
			<StatusBar
				barStyle={scheme === "dark" ? "light-content" : "dark-content"}
			/>
			<View
				style={{
					flex: 1,
				}}
			>
				<Header
					canGoBack
					intensity={100}
					leftTitle={filteredAlbum?.title}
					leftTitleStyle={{ color: colors.iosBlue }}
					backIconColor={colors.iosBlue}
					rightContainer={
						<View>
							<CustomTouchableOpacity onPress={pickImages}>
								<AntDesign
									name="plus"
									size={22}
									color={colors.iosBlue}
								/>
							</CustomTouchableOpacity>
						</View>
					}
				></Header>
				<Animated.FlatList
					data={[...filteredAlbum?.images].sort(
						(a, b) => b.update_at - a.update_at
					)}
					keyExtractor={(item) => item.iid}
					numColumns={3}
					itemLayoutAnimation={LinearTransition}
					contentContainerStyle={{
						paddingTop: insets.top + DIMENTIONS.HEADER_HEIGHT,
						gap: GAP,
					}}
					columnWrapperStyle={{
						gap: GAP,
					}}
					renderItem={({ item, index }) => (
						<CustomTouchableOpacity
							onPress={() => {
								setShowImageModal(true);
								setShowingImage(item);
							}}
						>
							<Animated.Image
								source={{ uri: item.source.uri }}
								style={{ width: itemWidth, aspectRatio: 1 }}
								entering={FadeIn.duration((index + 1) * 150)}
							/>
						</CustomTouchableOpacity>
					)}
				/>
			</View>
			<Modal visible={showImageModal}>
				{/* main container  */}
				<View
					style={{
						flex: 1,
						backgroundColor: colors.background,
						alignItems: "center",
						justifyContent: "center",
						position: "relative",
					}}
				>
					<View
						style={{
							height: DIMENTIONS.HEADER_HEIGHT,
							position: "absolute",
							top: 0,
							left: 0,
							width,
							paddingHorizontal: DIMENTIONS.APP_PADDING,
							marginTop: insets.top,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							backgroundColor: colors.background,
							borderBottomColor: colors.input,
							borderBottomWidth: 1,
							zIndex: 100,
						}}
					>
						<CustomTouchableOpacity
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 10,
							}}
							onPress={() => setShowImageModal(false)}
						>
							<AntDesign
								name="close"
								size={22}
								color={colors.iosBlue}
							/>
							<Text
								style={{ color: colors.iosBlue, fontSize: 18 }}
							>
								写真表示
							</Text>
						</CustomTouchableOpacity>

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
									color={colors.iosBlue}
									size={22}
								/>
							</CustomTouchableOpacity>
							<OptionModal
								iconStyle={{ color: colors.iosBlue }}
								options={[
									{
										label: "写真を削除",
										icon: (
											<Ionicons
												name="trash-outline"
												size={16}
											/>
										),
										action: () => {
											showingImage &&
												deleteImageFromAlbum(
													showingImage?.iid
												);
										},
									},
								]}
							/>
						</View>
					</View>
					<AutoHeightImage
						source={{ uri: showingImage?.source.uri }}
						width={width}
					/>
				</View>
			</Modal>
		</>
	);
};

export default AlbumImageListScreen;
