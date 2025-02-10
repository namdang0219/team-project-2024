import {
	View,
	StatusBar,
	Modal,
	Text,
	Dimensions,
	LogBox,
	useColorScheme,
	RefreshControl,
	Alert,
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
	PlatformColor,
	Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "layout/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTouchableOpacity } from "components/custom";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import {
	AntDesign,
	Ionicons,
	Feather,
	FontAwesome5,
	EvilIcons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
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
import TaggedFriends from "module/albumDetail/TaggedFriends";
import ImageView from "react-native-image-viewing";
import { ImageSource } from "react-native-image-viewing/dist/@types";
import memoize from "lodash/memoize";
import EnhancedImageViewing from "react-native-image-viewing";
import { formatDate } from "util/func/formatDate";

const GAP = 4;
const { width } = Dimensions.get("screen");

const AlbumImageListScreen = () => {
	const scheme = useColorScheme();
	const insets = useSafeAreaInsets();
	const { params } = useRoute<any>();
	const { navigate } = useNavigation<any>();
	const albums = useSelector((state: RootState) => state.albums);
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user);
	const itemWidth = useItemWidth(GAP, 3, 0);
	const [showingImageIndex, setShowingImageIndex] = useState<number>(0);
	const [showingImageData, setShowingImageData] = useState<ImageType | null>(
		null
	);
	const { colors } = useTheme();
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	LogBox.ignoreLogs(["Failed to get size for image file"]);

	const [filteredAlbum, setFilteredAlbum] = useState<AlbumType>();

	const aid = params?.aid;

	useEffect(() => {
		setFilteredAlbum(albums && albums.find((a: AlbumType) => aid == a.aid));
	}, [albums]);

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
			// dispatch(
			// 	removeImage({
			// 		albumId: aid,
			// 		// imageId: showingImage?.iid as string,
			// 	})
			// );

			dispatch(
				updateAlbum({
					...filteredAlbum,
					update_at: Date.now(),
					images: updatedImages,
				})
			);
			// setShowImageModal(false);
			Toast.success("写真を削除しました");
		} catch (error) {
			console.error("Lỗi khi xóa ảnh:", error);
			Toast.error("削除失敗");
		}
	};

	const onRefresh = () => {
		setIsRefreshing(true);
		setTimeout(() => {
			setIsRefreshing(false);
		}, 2000);
	};

	// handle image list
	const [visible, setIsVisible] = useState(false);

	const onShare = async () => {
		try {
			const result = await Share.share({
				message: "写真をシェアしましょう",
				title: "写真シェア",
			});

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					Alert.alert("シェアずみ");
				} else {
					Alert.alert("シェアずみ");
				}
			} else if (result.action === Share.dismissedAction) {
				return null;
			}
		} catch (error: any) {
			console.error(error.message);
		}
	};

	// edit modal

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
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing}
							onRefresh={onRefresh}
							progressViewOffset={
								insets.top + DIMENTIONS.HEADER_HEIGHT
							}
						/>
					}
					ListHeaderComponent={
						<View
							style={{
								flexDirection: "row",
								gap: 0,
								paddingBottom: 10,
								paddingHorizontal: DIMENTIONS.APP_PADDING,
								alignItems: "center",
							}}
						>
							<FontAwesome5 name="user-alt" size={16} />
							<View
								style={{
									transform: [
										{ scale: 0.8 },
										{ translateX: -2 },
									],
								}}
							>
								<TaggedFriends aid={aid} />
							</View>
						</View>
					}
					ListFooterComponent={
						<Text
							style={{
								color: colors.icon,
								paddingVertical: 50,
								textAlign: "center",
							}}
						>
							写真 {filteredAlbum.images.length} 枚
						</Text>
					}
					renderItem={({ item, index }) => (
						<CustomTouchableOpacity
							onPress={() => {
								setIsVisible(true);
								setShowingImageIndex(index);
								setShowingImageData(item);
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

				{/* showing image modal  */}
				{filteredAlbum && (
					<ImageView
						images={[...filteredAlbum?.images]
							.sort((a, b) => b.update_at - a.update_at)
							.map((i) => i.source)}
						imageIndex={showingImageIndex}
						visible={visible}
						onRequestClose={() => setIsVisible(false)}
						backgroundColor="white"
						swipeToCloseEnabled
						onImageIndexChange={(index) => console.log(index)}
						HeaderComponent={() => (
							<View
								style={{
									paddingTop: insets.top,
									backgroundColor: "white",
								}}
							>
								<View
									style={{
										backgroundColor: "white",
										height: DIMENTIONS.HEADER_HEIGHT,
										flexDirection: "row",
										alignItems: "center",
										paddingHorizontal:
											DIMENTIONS.APP_PADDING,
										justifyContent: "space-between",
									}}
								>
									<CustomTouchableOpacity
										onPress={() => setIsVisible(false)}
									>
										<AntDesign
											name="close"
											size={20}
											color={PlatformColor("systemBlue")}
										/>
									</CustomTouchableOpacity>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											gap: 16,
										}}
									>
										<CustomTouchableOpacity
											onPress={onShare}
										>
											<EvilIcons
												name="share-apple"
												size={30}
												color={PlatformColor(
													"systemBlue"
												)}
											/>
										</CustomTouchableOpacity>
										<OptionModal
											options={[
												{
													label: "写真を削除",
													icon: (
														<Ionicons name="trash-outline" />
													),
													action: () => {
														showingImageData &&
															deleteImageFromAlbum(
																showingImageData?.iid
															);
														setIsVisible(false);
													},
												},
											]}
											iconStyle={{
												color: PlatformColor(
													"systemBlue"
												),
											}}
										/>
									</View>
								</View>
							</View>
						)}
						FooterComponent={() => (
							<View
								style={{
									paddingBottom: insets.bottom,
									backgroundColor: "white",
								}}
							>
								<View
									style={{
										height: DIMENTIONS.HEADER_HEIGHT,
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
										paddingHorizontal:
											DIMENTIONS.APP_PADDING,
									}}
								>
									<Text
										style={{
											color: PlatformColor("systemBlue"),
										}}
									>
										{`作成日：${
											showingImageData &&
											formatDate(
												showingImageData?.create_at
											)
										}`}
									</Text>
									<CustomTouchableOpacity
										onPress={() => {
											setIsVisible(false);
											navigate("GlobalStack", {
												screen: "ImageEditScreen",
												params: {
													aid,
													imageData: showingImageData,
												},
											});
										}}
										style={{
											flexDirection: "row",
											alignItems: "center",
											gap: 10,
										}}
									>
										<Text
											style={{
												color: PlatformColor(
													"systemBlue"
												),
												fontSize: 18,
											}}
										>
											編集
										</Text>
									</CustomTouchableOpacity>
								</View>
							</View>
						)}
					/>
				)}
			</View>
		</>
	);
};

export default AlbumImageListScreen;
