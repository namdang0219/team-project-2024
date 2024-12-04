import {
	View,
	Text,
	Image,
	useWindowDimensions,
	ScrollView,
	FlatList,
	ImageBackground,
	StyleSheet,
	Modal,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DIMENTIONS } from "constant/dimention";
import { Feather, Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { CustomTouchableOpacity } from "components/custom";
import { useNavigation, useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { useToggle } from "hook/useToggle";
import Header from "layout/Header";
import Slider from "module/album/Slider";
import { albumMocks } from "mock/albumMocks";
import { userMocks } from "mock/userMocks";
import AlbumSearch from "./AlbumSearch";
import AlbumCreateModal from "./modal/AlbumCreateModal";

const AlbumScreen = () => {
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();
	const { colors } = useTheme();
	const { navigate } = useNavigation<any>();

	const [showOption, toggleShowOption, setShowOption] = useToggle(false);
	const [createAlbumModal, toggleCreateAlbumModal] = useToggle(false);
	
	const [image, setImage] = useState<string>(
		"https://i.pinimg.com/564x/a6/e9/2f/a6e92f1fd4af9c28fbc23f031f7c7419.jpg"
	);
	const [searchModal, toggleSearchModal] = useToggle(false);

	return (
		<View style={{ flex: 1 }}>
			{/* header : top + 50  */}
			<BlurView
				style={{
					paddingTop: insets.top,
					position: "absolute",
					top: 0,
					zIndex: 1000,
					width,
				}}
				intensity={100}
				tint="light"
			>
				{/* header container  */}

				<Header
					title="Album"
					rightContainer={
						<View
							style={[
								{
									flexDirection: "row",
									alignItems: "center",
									gap: 20,
								},
							]}
						>
							{/* search  */}
							<CustomTouchableOpacity onPress={toggleSearchModal}>
								<Feather name="search" size={24} />
							</CustomTouchableOpacity>

							{/* option  */}
							<View>
								<CustomTouchableOpacity
									style={{ position: "relative" }}
									onPress={toggleShowOption}
								>
									<Entypo
										name="dots-three-horizontal"
										size={20}
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
													borderBottomColor: "white",
													borderBottomWidth: 0.5,
												},
											]}
											onPress={() =>
												toggleCreateAlbumModal()
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
												justifyContent: "space-between",
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
						</View>
					}
				/>
				<Modal
					visible={searchModal}
					presentationStyle="fullScreen"
					animationType="fade"
				>
					<AlbumSearch
						toggleSeachModal={toggleSearchModal}
					></AlbumSearch>
				</Modal>
			</BlurView>
			<ScrollView
				style={{
					flex: 1,
					paddingTop: insets.top + DIMENTIONS.HEADER_HEIGHT,
				}}
				onScroll={() => {
					showOption && setShowOption(false);
				}}
			>
				<View style={{ flex: 1, gap: 35, paddingBottom: 250 }}>
					<Slider />

					{/* recent album  */}
					<View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								paddingHorizontal: DIMENTIONS.APP_PADDING,
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: "600" }}>
								最近のアルバム
							</Text>
							<CustomTouchableOpacity
								onPress={() =>
									navigate("GlobalStack", {
										screen: "AlbumListScreen",
									})
								}
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 4,
								}}
							>
								<Text style={{ color: colors.primary }}>
									すべて
								</Text>
								<Entypo
									name="chevron-thin-right"
									size={14}
									color={colors.primary}
								/>
							</CustomTouchableOpacity>
						</View>
						<FlatList
							data={albumMocks.slice(0, 5)}
							style={{ marginTop: 12 }}
							contentContainerStyle={{
								paddingHorizontal: DIMENTIONS.APP_PADDING,
								gap: 10,
							}}
							horizontal
							showsHorizontalScrollIndicator={false}
							renderItem={({ item, index }) => (
								<CustomTouchableOpacity
									onPress={() =>
										navigate("GlobalStack", {
											screen: "AlbumDetailScreen",
											params: { albumId: item.id },
										})
									}
									key={index}
								>
									<ImageBackground
										source={{
											uri: item.cover,
										}}
										style={{
											width: 150,
											height: 180,
											borderRadius: 12,
											position: "relative",
											overflow: "hidden",
										}}
									>
										{item.favorite && (
											<View
												style={{
													width: 24,
													aspectRatio: 1,
													backgroundColor: "white",
													borderRadius: 1000,
													alignItems: "center",
													justifyContent: "center",
													position: "absolute",
													bottom: 6,
													right: 6,
												}}
											>
												<AntDesign
													name="heart"
													color={"red"}
												/>
											</View>
										)}
									</ImageBackground>
								</CustomTouchableOpacity>
							)}
						/>
					</View>

					{/* with friend  */}
					<View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								paddingHorizontal: DIMENTIONS.APP_PADDING,
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: "600" }}>
								友達と
							</Text>
							<CustomTouchableOpacity
								onPress={() =>
									navigate("GlobalStack", {
										screen: "FriendListScreen",
									})
								}
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 4,
								}}
							>
								<Text style={{ color: colors.primary }}>
									すべて
								</Text>
								<Entypo
									name="chevron-thin-right"
									size={14}
									color={colors.primary}
								/>
							</CustomTouchableOpacity>
						</View>
						<View
							style={{
								flexDirection: "row",
								marginTop: 12,
								paddingHorizontal: DIMENTIONS.APP_PADDING,
								gap: 10,
							}}
						>
							{userMocks.slice(0, 4).map((item, index) => (
								<CustomTouchableOpacity
									key={index}
									onPress={() =>
										navigate("GlobalStack", {
											screen: "AlbumWithFriend",
											params: { userId: item.id },
										})
									}
								>
									<Image
										source={{
											uri: item.avatar,
										}}
										style={{
											width:
												(width -
													DIMENTIONS.APP_PADDING * 2 -
													10 * 3) /
												4,
											aspectRatio: "1/1",
											borderRadius: 1000,
										}}
									/>
									<Text
										style={{
											textAlign: "center",
											fontSize: 12,
											marginTop: 8,
										}}
										numberOfLines={1}
									>
										{item.name}
									</Text>
								</CustomTouchableOpacity>
							))}
						</View>
					</View>

					{/* favorite album  */}
					<View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								paddingHorizontal: DIMENTIONS.APP_PADDING,
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: "600" }}>
								お気に入り
							</Text>
							<CustomTouchableOpacity
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 4,
								}}
							>
								<Text style={{ color: colors.primary }}>
									すべて
								</Text>
								<Entypo
									name="chevron-thin-right"
									size={14}
									color={colors.primary}
								/>
							</CustomTouchableOpacity>
						</View>
						<FlatList
							data={albumMocks
								.filter((a) => a.favorite === true)
								.slice(0, 5)}
							style={{ marginTop: 12 }}
							contentContainerStyle={{
								paddingHorizontal: DIMENTIONS.APP_PADDING,
								gap: 10,
							}}
							horizontal
							showsHorizontalScrollIndicator={false}
							renderItem={({ item, index }) => (
								<CustomTouchableOpacity
									onPress={() =>
										navigate("GlobalStack", {
											screen: "AlbumDetailScreen",
											params: { albumId: item.id },
										})
									}
									key={index}
								>
									<ImageBackground
										source={{
											uri: item.cover,
										}}
										style={{
											width: 150,
											height: 180,
											borderRadius: 12,
											position: "relative",
											overflow: "hidden",
										}}
									></ImageBackground>
								</CustomTouchableOpacity>
							)}
						/>
					</View>

					{/* category  */}
					<View style={{ paddingHorizontal: DIMENTIONS.APP_PADDING }}>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "600",
								textAlign: "center",
							}}
						>
							カテゴリー
						</Text>
						<View
							style={{
								flexDirection: "row",
								flexWrap: "wrap",
								gap: 12,
								marginTop: 12,
							}}
						>
							{Array(4)
								.fill(null)
								.map((item, index) => (
									<CustomTouchableOpacity key={index}>
										<ImageBackground
											source={{
												uri: "https://i.pinimg.com/736x/3b/12/87/3b12878320d3ee5120d8a405afa4b5b8.jpg",
											}}
											style={{
												width:
													(width -
														DIMENTIONS.APP_PADDING *
															2 -
														12) /
													2,
												aspectRatio: "2/0.85",
												borderRadius: 10,
												overflow: "hidden",
												position: "relative",
											}}
										>
											<View
												style={[
													StyleSheet.absoluteFill,
													,
													{
														backgroundColor:
															"rgba(0,0,0,0.35)",
														alignItems: "center",
														justifyContent:
															"center",
													},
												]}
											>
												<Text
													style={{
														color: "white",
														fontSize: 20,
														fontWeight: "600",
													}}
												>
													#芸術
												</Text>
											</View>
										</ImageBackground>
									</CustomTouchableOpacity>
								))}
						</View>
					</View>

					{/* storage  */}
					<Text style={{ color: "gray", textAlign: "center" }}>
						11アルバム、400記念
					</Text>
				</View>
			</ScrollView>

			<Modal
				visible={createAlbumModal}
				animationType="slide"
				presentationStyle="fullScreen"
			>
				<AlbumCreateModal
					toggleCreateAlbumModal={toggleCreateAlbumModal}
					image={image}
					setImage={setImage}
				/>

				
			</Modal>
		</View>
	);
};

export default AlbumScreen;
