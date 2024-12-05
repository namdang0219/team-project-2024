import {
	View,
	Text,
	Image,
	useWindowDimensions,
	StatusBar,
	StyleSheet,
	Share,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { Button } from "components/button";
import { DIMENTIONS } from "constant/dimention";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "layout/Header";
import { CustomTouchableOpacity } from "components/custom";
import {
	AntDesign,
	Entypo,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useToggle } from "hook/useToggle";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { IAlbum } from "types/IAlbum";
import { userMocks } from "mock/userMocks";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";

const AlbumDetailScreen = () => {
	const { params } = useRoute<any>();
	const albums = useSelector((state: RootState) => state.album);

	const filteredAlbum: IAlbum | undefined = albums.find(
		(item) => item.id === params?.albumId
	);
	const { width } = useWindowDimensions();
	const insets = useSafeAreaInsets();
	const [showOption, toggleShowOption] = useToggle(false);
	const { navigate } = useNavigation<any>();

	const { colors } = useTheme();

	const taggedFriends = userMocks.filter((u) =>
		filteredAlbum?.taggedFriends.includes(u.id)
	);

	const [isFavorite, setIsFavorite] = useState(filteredAlbum?.favorite);

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
						style={{
							width: width,
							flex: 1,
							borderBottomLeftRadius: 25,
							borderBottomRightRadius: 25,
						}}
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
								<View>
									<CustomTouchableOpacity
										style={{ position: "relative" }}
										onPress={toggleShowOption}
									>
										<Entypo
											name="dots-three-horizontal"
											size={20}
											color="white"
										/>
									</CustomTouchableOpacity>
									{/* option modal  */}
									{showOption && (
										<BlurView
											style={{
												width: (width / 3) * 1.6,
												borderRadius: 10,
												position: "absolute",
												right: -10,
												top: 30,
												paddingHorizontal: 15,
												overflow: "hidden",
											}}
											tint="extraLight"
											intensity={95}
										>
											<CustomTouchableOpacity
												style={[
													{
														height: 48,
														flexDirection: "row",
														alignItems: "center",
														justifyContent:
															"space-between",
														borderBottomColor:
															"white",
														borderBottomWidth: 0.5,
													},
												]}
												onPress={() =>
													toggleShowOption()
												}
											>
												<Text>アルバム作成</Text>
												<MaterialIcons
													name="create"
													color={"black"}
													size={20}
												/>
											</CustomTouchableOpacity>
											<CustomTouchableOpacity
												style={{
													height: 48,
													flexDirection: "row",
													alignItems: "center",
													justifyContent:
														"space-between",
												}}
											>
												<Text>アルバム作成</Text>
												<MaterialIcons
													name="create"
													color={"black"}
													size={20}
												/>
											</CustomTouchableOpacity>
										</BlurView>
									)}
								</View>
							}
						></Header>
					</View>

					{/* action bottom bar  */}
					<View
						style={{
							position: "absolute",
							bottom: 15,
							width: "100%",
							flexDirection: "row",
							justifyContent: "space-between",
							paddingHorizontal: 15,
						}}
					>
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
								taggedFriends.slice(0, 3).map((f, index) => (
									<View
										key={f.id}
										style={{
											width: 45,
											aspectRatio: 1,
											borderColor: "white",
											backgroundColor: "white",
											borderWidth: 2,
											borderRadius: 1000,
											overflow: "hidden",
											marginLeft: index == 0 ? 0 : -20,
										}}
									>
										<Image
											source={{
												uri: f?.avatar,
											}}
											style={{
												flex: 1,
												borderRadius: 1000,
											}}
										/>
									</View>
								))}
							{taggedFriends.length > 3 && (
								<View
									style={{
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
									}}
								>
									<Image
										source={{
											uri: taggedFriends[4].avatar,
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
							<View
								style={{
									backgroundColor: "white",
									width: 45,
									height: 45,
									borderRadius: 1000,
								}}
							>
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
							<View
								style={{
									backgroundColor: "white",
									width: 45,
									height: 45,
									borderRadius: 1000,
								}}
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

export default AlbumDetailScreen;
