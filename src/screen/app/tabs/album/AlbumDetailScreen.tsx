import {
	View,
	Text,
	Image,
	StatusBar,
	StyleSheet,
	Share,
	Alert,
	Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "components/button";
import { DIMENTIONS } from "constant/dimention";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "layout/Header";
import { CustomTouchableOpacity } from "components/custom";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { IAlbum } from "types/IAlbum";
import { userMocks } from "mock/userMocks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import {
	addAlbumToFavorites,
	removeAlbum,
	removeAlbumFromFavorites,
} from "store/album/albumSlice";
import { OptionModal } from "components/modal";
import { IOption } from "components/modal/OptionModal";
import { IUser } from "types/IUser";

const { width } = Dimensions.get("screen");

const AlbumDetailScreen = () => {
	const { params } = useRoute<any>();
	const albums = useSelector((state: RootState) => state.album);
	const dispatch = useDispatch();

	const filteredAlbum: IAlbum | undefined = albums.find(
		(item: IAlbum) => item.aid === params?.aid
	);
	const insets = useSafeAreaInsets();
	const { navigate, goBack } = useNavigation<any>();

	const { colors } = useTheme();

	const taggedFriends = userMocks.filter((u) =>
		filteredAlbum?.taggedFriends.includes(u.uid)
	);

	const [isFavorite, setIsFavorite] = useState(filteredAlbum?.favorite);

	useEffect(() => {
		if (isFavorite) {
			dispatch(addAlbumToFavorites({ aid: filteredAlbum?.aid }));
		} else {
			dispatch(removeAlbumFromFavorites({ aid: filteredAlbum?.aid }));
		}
	}, [isFavorite]);

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
					dispatch(removeAlbum(filteredAlbum?.aid));
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
							uri: filteredAlbum?.cover,
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
									iconStyle={{ color: "white" }}
								></OptionModal>
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
							{taggedFriends.length > 0 &&
								taggedFriends
									.slice(0, 3)
									.map((f: IUser, index) => (
										<View
											key={f.uid}
											style={[
												styles.taggedFriendContainer,
												{
													marginLeft:
														index == 0 ? 0 : -20,
												},
											]}
										>
											<Image
												source={{
													uri: f?.photoURL,
												}}
												style={{
													flex: 1,
													borderRadius: 1000,
												}}
											/>
										</View>
									))}
							{taggedFriends.length > 3 && (
								<View style={styles.taggedFriendNum4}>
									<Image
										source={{
											uri: taggedFriends[3].photoURL,
										}}
										style={[
											{
												flex: 1,
												borderRadius: 1000,
											},
											StyleSheet.absoluteFill,
										]}
									/>
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
							<View style={styles.reactionIcon}>
								<CustomTouchableOpacity
									style={{
										flex: 1,
										alignItems: "center",
										justifyContent: "center",
									}}
									onPress={() => setIsFavorite(!isFavorite)}
								>
									<AntDesign
										name="heart"
										size={25}
										color={isFavorite ? "red" : "#d1d5db"}
										style={{ marginTop: 2 }}
									/>
								</CustomTouchableOpacity>
							</View>

							{/* share icon  */}
							<View style={styles.reactionIcon}>
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
					<Text
						style={{
							color: colors.subGray,
							opacity: 0.8,
							marginLeft: 4,
						}}
					>
						2024/12/02
					</Text>
					<Text
						style={{
							fontSize: 24,
							fontWeight: "600",
							marginTop: 4,
						}}
						numberOfLines={1}
					>
						{filteredAlbum?.title}
					</Text>
					<Text style={{ marginTop: 10 }} numberOfLines={2}>
						{filteredAlbum?.desc}
					</Text>
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
