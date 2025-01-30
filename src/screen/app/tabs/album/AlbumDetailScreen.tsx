import {
	View,
	Image,
	StatusBar,
	StyleSheet,
	Share,
	Alert,
	Dimensions,
	Text,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "components/button";
import { DIMENTIONS } from "constant/dimention";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "layout/Header";
import { CustomTouchableOpacity } from "components/custom";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { IAlbum, ITaggedFriend } from "types/IAlbum";
import { OptionModal } from "components/modal";
import { IOption } from "components/modal/OptionModal";
import { ThemedText } from "components/themed";
import Animated, { FadeInDown } from "react-native-reanimated";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../../../firebaseConfig";
import { Toast } from "toastify-react-native";
import { formatDate } from "util/func/formatDate";
import { customStyle } from "style/customStyle";
import { lightTheme } from "util/theme/themeColors";
import { deleteObject, ref } from "firebase/storage";
import { useAlbum } from "context/album-context";
import { IImage } from "types/IImage";

const { width } = Dimensions.get("screen");

const AnimatedThemedText = Animated.createAnimatedComponent(ThemedText);

const AlbumDetailScreen = () => {
	const { params } = useRoute<any>();
	const insets = useSafeAreaInsets();
	const { navigate, goBack } = useNavigation<any>();
	const { colors } = useTheme();
	const [currentAlbum, setCurrentAlbum] = useState<IAlbum | null>(null);
	const [changingFavorite, setChangingFavorite] = useState<boolean>(false);
	const { albums } = useAlbum();

	const aid = params.aid;

	useEffect(() => {
		const getCurrentAlbum = () => {
			const albumData = albums.find((album) => album.aid === aid);
			setCurrentAlbum(albumData as IAlbum);
		};

		getCurrentAlbum();
	}, []);

	// get album
	// useEffect(() => {
	// 	const getCurrentAlbum = async () => {
	// 		try {
	// 			setLoading(true);
	// 			const docRef = doc(db, "0_albums", aid);

	// 			const unsub = onSnapshot(docRef, (doc) => {
	// 				setCurrentAlbum(doc.data() as IAlbum);
	// 			});

	// 			return unsub;
	// 		} catch (error) {
	// 			console.log(error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};
	// 	getCurrentAlbum();
	// }, []);

	async function handleRemoveAlbum(aid: string) {
		try {
			const docRef = doc(db, "0_albums", aid);

			// delete cover image
			const coverRef = ref(
				storage,
				`0_images/${currentAlbum?.cover.fileName}`
			);
			await deleteObject(coverRef);

			// delete images in albums
			const deleteImageTasks = currentAlbum?.images.map(
				async (image: IImage) => {
					try {
						const filePath = image.iid 
						const imageRef = ref(
							storage,
							`0_photos/${filePath}.jpg`
						);
						await deleteObject(imageRef);
					} catch (error) {
						console.error("エラー", error);
					}
				}
			);

			// Chờ tất cả ảnh được xóa xong
			await Promise.all(deleteImageTasks as any);

			// Xóa album khỏi Firestore
			await deleteDoc(docRef);

			// delete from db
			await deleteDoc(docRef);
			Toast.success("アルバムを削除しました");
		} catch (error) {
			console.log(error);
			Toast.error("アルバム削除できませんでした");
		}
	}

	const removeCurrentAlbum = () => {
		Alert.alert("アルバムを削除しますか？", "", [
			{
				text: "キャンセル",
				style: "cancel",
			},
			{
				text: "削除する",
				style: "destructive",
				onPress: () => {
					handleRemoveAlbum(aid);
					goBack();
				},
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

	async function handleChangeFavorite() {
		try {
			setChangingFavorite(true);
			const albumDoc = doc(db, "0_albums", aid);
			await updateDoc(albumDoc, {
				favorite: !currentAlbum?.favorite,
				update_at: Date.now(),
			});
			Toast.success("更新済み");
		} catch (error) {
			console.log(error);
			Toast.success("エラー");
		} finally {
			setChangingFavorite(false);
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

	if (!currentAlbum) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>アルバムが見つかりませんでした 🥲</Text>
			</View>
		);
	}

	return (
		<>
			<StatusBar barStyle={"light-content"} />
			<View style={{ flex: 1, paddingBottom: insets.bottom }}>
				<View style={{ flex: 1, position: "relative" }}>
					<Image
						source={{
							uri: currentAlbum?.cover.uri,
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
							backIconStyle={customStyle.shadow}
							leftTitleStyle={{
								shadowOpacity: 0.25,
								shadowOffset: { height: 0, width: 0 },
							}}
							rightContainer={
								<OptionModal
									options={options}
									iconStyle={[
										{ color: "white" },
										customStyle.shadow,
									]}
								/>
							}
						></Header>
					</View>

					{/* action bottom bar  */}
					<View style={styles.actionBottomContainer}>
						{/* left container  */}
						<CustomTouchableOpacity
							style={{ flexDirection: "row" }}
							onPress={() =>
								navigate("GlobalStack", {
									screen: "AlbumTaggedFriend",
								})
							}
						>
							{currentAlbum?.taggedFriends.length > 0 &&
								currentAlbum?.taggedFriends
									.slice(0, 3)
									.map((f: ITaggedFriend, index) => (
										<View
											key={f.userId}
											style={[
												styles.taggedFriendContainer,
												{
													marginLeft:
														index == 0 ? 0 : -20,
												},
											]}
										>
											{f?.photoURL ? (
												<Image
													source={{
														uri: f?.photoURL,
													}}
													style={{
														flex: 1,
														borderRadius: 1000,
													}}
												/>
											) : (
												<View
													style={{
														backgroundColor:
															colors.input,
														flex: 1,
														alignItems: "center",
														justifyContent:
															"center",
													}}
												>
													<Text
														style={{
															color: colors.icon,
														}}
													>
														{f.displayName?.slice(
															0,
															1
														)}
													</Text>
												</View>
											)}
										</View>
									))}
							{currentAlbum?.taggedFriends.length > 3 && (
								<View style={styles.taggedFriendNum4}>
									{currentAlbum?.taggedFriends[3]
										?.photoURL ? (
										<Image
											source={{
												uri: currentAlbum
													?.taggedFriends[3]
													?.photoURL,
											}}
											style={{
												flex: 1,
												borderRadius: 1000,
											}}
										/>
									) : (
										<View
											style={{
												backgroundColor: colors.input,
												flex: 1,
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Text
												style={{
													color: colors.icon,
												}}
											>
												{currentAlbum?.taggedFriends[3].displayName?.slice(
													0,
													1
												)}
											</Text>
										</View>
									)}
									<View
										style={[
											{
												backgroundColor: "black",
												opacity: 0.35,
											},
											StyleSheet.absoluteFill,
										]}
									/>
									<AntDesign
										name="plus"
										size={24}
										color={"white"}
									/>
								</View>
							)}
						</CustomTouchableOpacity>

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
									customStyle.shadow,
								]}
							>
								<CustomTouchableOpacity
									style={{
										flex: 1,
										alignItems: "center",
										justifyContent: "center",
									}}
									onPress={handleChangeFavorite}
								>
									{!changingFavorite ? (
										<AntDesign
											name="heart"
											size={25}
											color={
												currentAlbum?.favorite
													? "red"
													: "#d1d5db"
											}
											style={{ marginTop: 2 }}
										/>
									) : (
										<ActivityIndicator size="small" />
									)}
								</CustomTouchableOpacity>
							</View>

							{/* share icon  */}
							<View
								style={[
									styles.reactionIcon,
									customStyle.shadow,
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
						{formatDate(currentAlbum.create_at)}
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
						{currentAlbum?.title}
					</AnimatedThemedText>
					<AnimatedThemedText
						style={{ marginTop: 10 }}
						numberOfLines={2}
						entering={FadeInDown.duration(800)}
					>
						{currentAlbum?.desc}
					</AnimatedThemedText>
					<Button
						style={{ marginTop: 20, marginBottom: 5 }}
						onPress={() =>
							navigate("GlobalStack", {
								screen: "AlbumImageListScreen",
								params: { aid: currentAlbum?.aid },
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
		backgroundColor: lightTheme.colors.input,
	},
	actionBottomContainer: {
		position: "absolute",
		bottom: 15,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
	taggedFriendContainer: {
		width: 45,
		aspectRatio: 1,
		borderColor: "white",
		backgroundColor: "white",
		borderWidth: 2,
		borderRadius: 1000,
		overflow: "hidden",
	},
	taggedFriendNum4: {
		width: 45,
		aspectRatio: 1,
		borderColor: "white",
		backgroundColor: "white",
		borderWidth: 2,
		borderRadius: 1000,
		overflow: "hidden",
		marginLeft: -20,
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},
	reactionIcon: {
		backgroundColor: "white",
		width: 45,
		height: 45,
		borderRadius: 1000,
	},
});

export default AlbumDetailScreen;
