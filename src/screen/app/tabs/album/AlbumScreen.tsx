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
	Alert,
	TouchableWithoutFeedback,
	Pressable,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DIMENTIONS } from "constant/dimention";
import { Feather, Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { CustomTouchableOpacity } from "components/custom";
import { useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { useToggle } from "hook/useToggle";
import { Input } from "components/input";
import { Label } from "components/label";
import handlePressBackground from "util/func/handlePressBackground";
import * as ImagePicker from "expo-image-picker";

const AlbumScreen = () => {
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();
	const { colors } = useTheme();

	const [showOption, toggleShowOption, setShowOption] = useToggle(false);
	const [createAlbumModal, toggleCreateAlbumModal] = useToggle(false);
	const [addFriendModal, toggleAddFriendModal] = useToggle(false);
	const [image, setImage] = useState<string>(
		"https://i.pinimg.com/564x/a6/e9/2f/a6e92f1fd4af9c28fbc23f031f7c7419.jpg"
	);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [2, 1],
			quality: 1,
		});

		// console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

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
				<View
					style={[
						{
							height: DIMENTIONS.HEADER_HEIGHT,
							flexDirection: "row",
							alignItems: "center",
							paddingHorizontal: DIMENTIONS.APP_PADDING + 6,
							justifyContent: "space-between",
						},
					]}
				>
					<Text style={{ fontSize: 26, fontWeight: "600" }}>
						Album
					</Text>
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
						<CustomTouchableOpacity>
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
												justifyContent: "space-between",
												borderBottomColor: "white",
												borderBottomWidth: 0.5,
											},
										]}
										onPress={() => toggleCreateAlbumModal()}
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
				</View>
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
					{/* slider  */}
					<View>
						<Image
							source={{
								uri: "https://i.pinimg.com/736x/0a/27/fc/0a27fcae94d93113d2a9f326d7ea04a1.jpg",
							}}
							style={{ height: 220, width }}
						/>
					</View>

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
							data={new Array(5).fill(null)}
							style={{ marginTop: 12 }}
							contentContainerStyle={{
								paddingHorizontal: DIMENTIONS.APP_PADDING,
								gap: 10,
							}}
							horizontal
							showsHorizontalScrollIndicator={false}
							renderItem={({ item, index }) => (
								<CustomTouchableOpacity key={index}>
									<Image
										source={{
											uri: "https://i.pinimg.com/736x/49/d7/e7/49d7e79e5ac4e3b40e7d0b1f1d91df8d.jpg",
										}}
										style={{
											width: 150,
											height: 180,
											borderRadius: 10,
										}}
									/>
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
							{new Array(4).fill(null).map((item, index) => (
								<CustomTouchableOpacity key={index}>
									<Image
										source={{
											uri: "https://i.pinimg.com/736x/d3/e1/6a/d3e16a975b1cff37e5a30cea031f1c5f.jpg",
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
										KimCheese
									</Text>
								</CustomTouchableOpacity>
							))}
						</View>
					</View>

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
							data={new Array(5).fill(null)}
							style={{ marginTop: 12 }}
							contentContainerStyle={{
								paddingHorizontal: DIMENTIONS.APP_PADDING,
								gap: 10,
							}}
							horizontal
							showsHorizontalScrollIndicator={false}
							renderItem={({ item, index }) => (
								<CustomTouchableOpacity key={index}>
									<Image
										source={{
											uri: "https://i.pinimg.com/736x/e2/9a/e6/e29ae6e909cf6dbdcda1a6fc42f142a4.jpg",
										}}
										style={{
											width: 150,
											height: 180,
											borderRadius: 10,
										}}
									/>
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
				<View
					style={{
						paddingTop: insets.top,
						flex: 1,
					}}
				>
					{/* header  */}
					<View
						style={{
							height: DIMENTIONS.HEADER_HEIGHT,
							paddingHorizontal: DIMENTIONS.APP_PADDING,
							alignItems: "center",
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<CustomTouchableOpacity
							onPress={() => {
								Alert.alert(
									"破壊？",
									"全ての内容が削除されます",
									[
										{
											text: "キャンセル",
											style: "cancel",
										},
										{
											text: "破壊",
											onPress: () =>
												toggleCreateAlbumModal(),
											style: "destructive",
										},
									]
								);
							}}
						>
							<Feather name="x" size={26} color={"red"} />
						</CustomTouchableOpacity>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "500",
								width: width / 2,
								textAlign: "center",
							}}
						>
							アルバム作成
						</Text>
						<CustomTouchableOpacity
							onPress={toggleCreateAlbumModal}
						>
							<Feather name="check" size={26} color={"#00C261"} />
						</CustomTouchableOpacity>
					</View>

					{/* content  */}
					<TouchableWithoutFeedback onPress={handlePressBackground}>
						<ScrollView style={{ flex: 1 }}>
							<ImageBackground
								source={{
									uri: image,
								}}
								style={{
									height: 250,
									marginTop: 5,
									position: "relative",
								}}
							>
								<CustomTouchableOpacity
									style={{
										position: "absolute",
										bottom: 20,
										right: 20,
									}}
									onPress={pickImage}
								>
									<Feather
										name="edit"
										size={30}
										color={"white"}
									/>
								</CustomTouchableOpacity>
							</ImageBackground>
							{/* input  */}
							<View
								style={{
									paddingHorizontal: DIMENTIONS.APP_PADDING,
									marginTop: 20,
									flex: 1,
									gap: 14,
								}}
							>
								<View>
									<Label>タイトル</Label>
									<Input placeholder="アルバムのタイトル" />
								</View>
								<View>
									<Label>説明</Label>
									<Input placeholder="アルバムの説明" />
								</View>
								<View>
									<Label>友達</Label>
									<View
										style={{
											flexDirection: "row",
											flexWrap: "wrap",
											gap: 10,
										}}
									>
										{Array(6)
											.fill(null)
											.map((item, index) => (
												<View key={index}>
													<Image
														source={{
															uri: "https://i.pinimg.com/564x/11/cd/ed/11cdedf63e1fd9aa0c84b94d210a4039.jpg",
														}}
														style={{
															width:
																(width -
																	DIMENTIONS.APP_PADDING *
																		2 -
																	10 * 4) /
																5,
															aspectRatio: "1/1",
															borderRadius: 1000,
														}}
													/>
												</View>
											))}
										<CustomTouchableOpacity
											style={{
												width:
													(width -
														DIMENTIONS.APP_PADDING *
															2 -
														10 * 4) /
													5,
												aspectRatio: "1/1",
												borderRadius: 1000,
												backgroundColor: "#f3f4f6",
												alignItems: "center",
												justifyContent: "center",
											}}
											onPress={toggleAddFriendModal}
										>
											<AntDesign
												name="plus"
												color={"#9ca3af"}
												size={30}
											/>
										</CustomTouchableOpacity>
									</View>
								</View>
							</View>

							<View style={{ height: 500 }}></View>
						</ScrollView>
					</TouchableWithoutFeedback>
				</View>

				<Modal
					visible={addFriendModal}
					animationType="slide"
					presentationStyle="formSheet"
				>
					<TouchableWithoutFeedback onPress={handlePressBackground}>
						{/* content  */}
						<View style={{ flex: 1 }}>
							<View
								style={{
									height: 40,
									alignItems: "center",
									paddingLeft: 14,
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<CustomTouchableOpacity
									onPress={toggleAddFriendModal}
								>
									<Text
										style={{ color: "black", fontSize: 16 }}
									>
										キャンセル
									</Text>
								</CustomTouchableOpacity>
							</View>

							<View
								style={{
									marginHorizontal: 14,
									position: "relative",
								}}
							>
								<TextInput
									placeholder="友達を検索"
									placeholderTextColor={"#9ca3af"}
									style={{
										backgroundColor: "rgba(0,0,0,0.05)",
										height: 35,
										paddingHorizontal: 14,
										borderRadius: 6,
										color: "white",
									}}
								/>
								<Feather
									name="search"
									size={20}
									style={{
										position: "absolute",
										right: 10,
										top: 7,
										color: "gray",
									}}
								/>
							</View>

							<FlatList
								data={new Array(20).fill(null)}
								style={{marginTop: 6}}
								contentContainerStyle={{
									paddingHorizontal: DIMENTIONS.APP_PADDING,
									paddingVertical: 5,
									flexGrow: 1,
								}}
								renderItem={({ item, index }) => (
									<TouchableWithoutFeedback key={index}>
										<View
											style={{
												paddingVertical: 5,
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
													gap: 10,
												}}
											>
												<Image
													source={{
														uri: "https://i.pinimg.com/564x/b8/6f/05/b86f052d99b84f5d77fa96771f6c75e1.jpg",
													}}
													style={{
														width: 52,
														aspectRatio: "1/1",
														borderRadius: 1000,
													}}
												/>
												<Text style={{ fontSize: 15 }}>
													Andree Righthand
												</Text>
											</View>

											<CustomTouchableOpacity
												style={{
													backgroundColor:
														colors.primary,
													width: 60,
													paddingVertical: 5,
													alignItems: "center",
													justifyContent: "center",
													borderRadius: 5,
												}}
											>
												<Text
													style={{
														color: "white",
														fontWeight: "500",
													}}
												>
													タグ
												</Text>
											</CustomTouchableOpacity>
										</View>
									</TouchableWithoutFeedback>
								)}
							/>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</Modal>
		</View>
	);
};

export default AlbumScreen;
