import { View, StatusBar, Modal, Text, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import Header from "layout/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTouchableOpacity } from "components/custom";
import { useRoute, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";
import { useItemWidth } from "hook/useItemWidth";
import { DIMENTIONS } from "constant/dimention";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import { AlbumType } from "types/AlbumType";
import { ImageType } from "types/ImageType";
import * as FileSystem from "expo-file-system";
import { updateAlbum } from "store/album/albumSlice";
import ImageViewScreen from "./ImageViewScreen";
import { AutoHeightImage } from "components/image";

const GAP = 4;
const { width } = Dimensions.get("screen");

const AlbumImageListScreen = () => {
	const insets = useSafeAreaInsets();
	const { params } = useRoute<any>();
	const albums = useSelector((state: RootState) => state.albums);
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user);
	const itemWidth = useItemWidth(GAP, 3, 0);
	const [showImageModal, setShowImageModal] = useState<boolean>(false);
	const [showingImage, setShowingImage] = useState<ImageType | null>(null);
	const { colors } = useTheme();

	const aid = params?.aid;
	const filteredAlbum = albums && albums.find((a: AlbumType) => aid == a.aid);

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

	return (
		<>
			<StatusBar barStyle={"dark-content"} />
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
					data={filteredAlbum?.images}
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
				<View
					style={{
						flex: 1,
						backgroundColor: colors.background,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
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
