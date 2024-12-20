import { View, StatusBar, FlatList } from "react-native";
import React from "react";
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
import Animated from "react-native-reanimated";

const GAP = 4;

const AlbumImageListScreen = () => {
	const insets = useSafeAreaInsets();
	const { params } = useRoute<any>();
	const albums = useSelector((state: RootState) => state.album);
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user);
	const itemWidth = useItemWidth(GAP, 3, 0);
	const { navigate } = useNavigation<any>();

	const aid = params?.aid;
	const filteredAlbum = albums.find((a: IAlbum) => aid == a.aid);
	const imageIds = filteredAlbum?.images || [];

	const imageData = imageMocks.filter((i: IImage) =>
		imageIds.includes(i.iid)
	);

	const pickImages = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [4, 3],
			quality: 1,
			allowsMultipleSelection: true,
		});

		if (!result.canceled) {
			const newImages: IImage[] = result.assets.map((a) => ({
				iid: a?.fileName as string,
				uri: a?.uri,
				album: [
					filteredAlbum?.aid as string,
					filteredAlbum?.aid as string,
				],
				author: user.uid,
				location: {
					lat: 0,
					long: 0,
				},
				create_at: Number(new Date()),
				update_at: Number(new Date()),
			}));
			dispatch(addImagesToAlbum({ aid: aid, images: newImages }));
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
				<FlatList
					data={imageData}
					keyExtractor={(item) => item.iid}
					numColumns={3}
					contentContainerStyle={{
						paddingTop: insets.top + DIMENTIONS.HEADER_HEIGHT,
						gap: GAP,
					}}
					columnWrapperStyle={{
						gap: GAP,
					}}
					renderItem={({ item }) => (
						<CustomTouchableOpacity
							onPress={() =>
								navigate("GlobalStack", {
									screen: "ImageViewScreen",
									params: { imageIds },
								})
							}
						>
							<Animated.Image
								source={{ uri: item.uri }}
								style={{ width: itemWidth, aspectRatio: 1 }}
								sharedTransitionTag={item.iid}
							/>
						</CustomTouchableOpacity>
					)}
				/>
			</View>
		</>
	);
};

export default AlbumImageListScreen;
