import { View, StatusBar, FlatList, Modal } from "react-native";
import React, { useRef, useState } from "react";
import Header from "layout/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTouchableOpacity } from "components/custom";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { IAlbum } from "types/IAlbum";
import { IImage } from "types/IImage";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { addImagesToAlbum } from "store/album/albumSlice";
import { Toast } from "toastify-react-native";
import { imageMocks } from "mock/imageMocks";
import { useItemWidth } from "hook/useItemWidth";
import { DIMENTIONS } from "constant/dimention";
import Animated, {
	FadeIn,
	LinearTransition,
	ZoomIn,
	ZoomInDown,
	ZoomOutRotate,
} from "react-native-reanimated";
import { addImage } from "store/image/imageSlice";
import { GalleryRef } from "react-native-awesome-gallery";
import ImageViewScreen from "./ImageViewScreen";

const GAP = 4;

const AlbumImageListScreen = () => {
	const insets = useSafeAreaInsets();
	const { params } = useRoute<any>();
	const albums = useSelector((state: RootState) => state.album);
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user);
	const itemWidth = useItemWidth(GAP, 3, 0);
	const images = useSelector((state: RootState) => state.image);
	const [showImageModal, setShowImageModal] = useState<boolean>(false);
	const [imageModalImageId, setImageModalImageId] = useState<number>(0);

	const aid = params?.aid;
	const filteredAlbum = albums.find((a: IAlbum) => aid == a.aid);
	const imageIds = filteredAlbum?.images || [];

	const imageData = images.filter((i: IImage) => imageIds.includes(i.iid));

	const pickImages = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [4, 3],
			quality: 1,
			allowsMultipleSelection: true,
		});

		if (!result.canceled) {
			const newImages: IImage[] = result.assets.map((a) => ({
				iid: a?.fileName + String(Date.now()),
				uri: a?.uri,
				album: [filteredAlbum?.aid as string],
				author: user.uid,
				location: {
					lat: 0,
					long: 0,
				},
				create_at: Number(new Date()),
				update_at: Number(new Date()),
			}));
			dispatch(addImage(newImages));
			dispatch(
				addImagesToAlbum({
					aid: aid,
					imageIds: newImages.map((i) => String(i.iid)),
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
					leftTitleStyle={{ color: "black" }}
					backIconColor="black"
					rightContainer={
						<View>
							<CustomTouchableOpacity onPress={pickImages}>
								<AntDesign name="plus" size={22} />
							</CustomTouchableOpacity>
						</View>
					}
				></Header>
				<Animated.FlatList
					data={imageData}
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
								setImageModalImageId(index);
							}}
						>
							<Animated.Image
								source={{ uri: item.uri }}
								style={{ width: itemWidth, aspectRatio: 1 }}
								entering={FadeIn.duration((index + 1) * 150)}
								// sharedTransitionTag={item.iid}
							/>
						</CustomTouchableOpacity>
					)}
				/>
			</View>
			<Modal visible={showImageModal}>
				<ImageViewScreen
					imageIds={imageIds}
					imageModalImageId={imageModalImageId}
					setShowImageModal={setShowImageModal}
				/>
			</Modal>
		</>
	);
};

export default AlbumImageListScreen;
