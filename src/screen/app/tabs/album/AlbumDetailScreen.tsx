import {
	View,
	Image,
	StatusBar,
	StyleSheet,
	Share,
	Alert,
	Dimensions,
	Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "components/button";
import { DIMENTIONS } from "constant/dimention";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "layout/Header";
import { CustomTouchableOpacity } from "components/custom";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { userMocks } from "mock/userMocks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/configureStore";
import { OptionModal } from "components/modal";
import { IOption } from "components/modal/OptionModal";
import { ThemedText } from "components/themed";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CUSTOM_STYLES } from "style/customStyle";
import { formatDate } from "util/func/formatDate";
import { UserType } from "types/UserType";
import { setUserData } from "store/user/userSlice";
import { removeAlbum, updateAlbum } from "store/album/albumSlice";
import { AlbumType } from "types/AlbumType";
import * as FileSystem from "expo-file-system";
import { Toast } from "toastify-react-native";
import { useToggle } from "hook/useToggle";
import AlbumTagFriendModal from "./modal/AlbumTagFriendModal";
import TaggedFriends from "module/albumDetail/TaggedFriends";

const { width } = Dimensions.get("screen");

const AnimatedThemedText = Animated.createAnimatedComponent(ThemedText);

const AlbumDetailScreen = () => {
	const { params } = useRoute<any>();
	const albums = useSelector(
		(state: RootState) => state.albums as AlbumType[]
	);
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.user as UserType);

	const aid = params?.aid;

	const filteredAlbum = albums.find((item: AlbumType) => item.aid === aid);
	const insets = useSafeAreaInsets();
	const { navigate, goBack } = useNavigation<any>();

	const { colors } = useTheme();

	const taggedFriends = userMocks.filter((u) =>
		filteredAlbum?.taggedFriends.includes(u.uid)
	);

	// delete album
	const deleteAlbum = async () => {
		if (!filteredAlbum) return;
		try {
			// Delete album from the list
			if (filteredAlbum.cover?.uri) {
				await FileSystem.deleteAsync(filteredAlbum.cover.uri, {
					idempotent: true,
				});
				console.log(
					"Cover image was deleted:",
					filteredAlbum.cover.uri
				);
			}

			for (const image of filteredAlbum.images) {
				await FileSystem.deleteAsync(image.source.uri, {
					idempotent: true,
				});
				console.log("Image was deleted:", image.source.uri);
			}

			// Delete album from user favorites if include
			dispatch(
				setUserData({
					favorites: user.favorites.includes(aid)
						? user.favorites.filter((f) => f != aid)
						: [...user.favorites],
				})
			);

			dispatch(removeAlbum(aid));
			goBack();
			Toast.success("アルバム削除成功");
		} catch (error) {
			console.error("Lỗi khi xóa album:", error);
			Toast.error("削除失敗");
		}
	};

	const removeCurrentAlbum = () => {
		Alert.alert("アルバムを削除しますか？", "", [
			{
				text: "キャンセル",
				style: "cancel",
			},
			{
				text: "削除する",
				style: "destructive",
				onPress: () => deleteAlbum(),
			},
		]);
	};

	const options: IOption[] = [
		{
			label: "カバー写真を編集",
			icon: (
				<MaterialCommunityIcons
					name="pencil"
					color={"black"}
					size={20}
				/>
			),
			action: () => null,
		},
		{
			label: "アルバムを削除",
			icon: <Feather name="trash-2" color={"black"} size={20} />,
			action: removeCurrentAlbum,
		},
	];

	async function handleToggleAlbumFavorite() {
		const updateUpdateTime = () => {
			dispatch(
				updateAlbum({
					...(filteredAlbum as AlbumType),
					update_at: Date.now(),
				})
			);
		};

		if (user.favorites.includes(aid)) {
			dispatch(
				setUserData({
					favorites: user.favorites.filter((f) => f != aid),
				})
			);
			updateUpdateTime();
			Toast.success("お気に入りから削除済み");
		} else if (!user.favorites.includes(aid)) {
			dispatch(
				setUserData({
					favorites: [...user.favorites, aid],
				})
			);
			updateUpdateTime();
			Toast.success("お気に入りに追加済み");
		}
	}

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

	return (
		<>
			<StatusBar barStyle={"light-content"} />
			<View style={{ flex: 1, paddingBottom: insets.bottom }}>
				<View style={{ flex: 1, position: "relative" }}>
					<Image
						source={{
							uri: filteredAlbum?.cover.uri,
						}}
						style={styles.image}
					/>
					{/* header  */}
					<View
						style={{ paddingTop: insets.top, position: "absolute" }}
					>
						<Header
							leftTitle="Album"
							canGoBack
							intensity={0}
							leftTitleStyle={{
								shadowOpacity: 0.25,
								shadowOffset: { height: 0, width: 0 },
							}}
							rightContainer={
								<OptionModal
									options={options}
									iconStyle={[
										{ color: "white" },
										CUSTOM_STYLES.shadow,
									]}
								></OptionModal>
							}
						></Header>
					</View>

					{/* action bottom bar  */}
					<View style={[styles.actionBottomContainer]}>
						{/* left container  */}
						<TaggedFriends aid={aid} />

						{/* right container  */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 10,
							}}
						>
							{/* heart icon  */}
							<View
								style={[
									styles.reactionIcon,
									CUSTOM_STYLES.shadow,
								]}
							>
								<CustomTouchableOpacity
									style={{
										flex: 1,
										alignItems: "center",
										justifyContent: "center",
									}}
									onPress={handleToggleAlbumFavorite}
								>
									<AntDesign
										name="heart"
										size={25}
										color={
											user.favorites.includes(aid)
												? "red"
												: "#d1d5db"
										}
										style={{ marginTop: 2 }}
									/>
								</CustomTouchableOpacity>
							</View>

							{/* share icon  */}
							<View
								style={[
									styles.reactionIcon,
									CUSTOM_STYLES.shadow,
								]}
							>
								<CustomTouchableOpacity
									onPress={onShare}
									style={{
										width: 45,
										height: 45,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<MaterialCommunityIcons
										name="share"
										size={35}
										color={"#0ea5e9"}
										style={{ marginTop: -4 }}
									/>
								</CustomTouchableOpacity>
							</View>
						</View>
					</View>
				</View>
				{/* content view  */}
				<View
					style={{
						marginTop: 25,
						paddingHorizontal: DIMENTIONS.APP_PADDING,
					}}
				>
					<AnimatedThemedText
						style={{
							color: colors.subGray,
						}}
						entering={FadeInDown.duration(400)}
					>
						{formatDate(filteredAlbum?.create_at as number)}
					</AnimatedThemedText>
					<AnimatedThemedText
						style={{
							fontSize: 24,
							fontWeight: "600",
							marginTop: 4,
						}}
						numberOfLines={1}
						entering={FadeInDown.duration(600)}
					>
						{filteredAlbum?.title}
					</AnimatedThemedText>
					<AnimatedThemedText
						style={{ marginTop: 10 }}
						numberOfLines={2}
						entering={FadeInDown.duration(800)}
					>
						{filteredAlbum?.desc}
					</AnimatedThemedText>
					<Button
						style={{ marginTop: 20, marginBottom: 5 }}
						onPress={() =>
							navigate("GlobalStack", {
								screen: "AlbumImageListScreen",
								params: { aid: filteredAlbum?.aid },
							})
						}
					>
						アルバムを見る
					</Button>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	image: {
		width: width,
		flex: 1,
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,
	},
	actionBottomContainer: {
		position: "absolute",
		bottom: 15,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
	reactionIcon: {
		backgroundColor: "white",
		width: 45,
		height: 45,
		borderRadius: 1000,
	},
});

export default AlbumDetailScreen;
