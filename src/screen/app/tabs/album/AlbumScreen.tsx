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
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DIMENTIONS } from "constant/dimention";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import { CustomTouchableOpacity } from "components/custom";
import { useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { useToggle } from "hook/useToggle";

const AlbumScreen = () => {
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();
	const { colors } = useTheme();

	const [showOption, toggleShowOption, setShowOption] = useToggle(false);
	const [createAlbumModal, toggleCreateAlbumModal] = useToggle(false);

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
					style={{
						height: DIMENTIONS.HEADER_HEIGHT,
						flexDirection: "row",
						alignItems: "center",
						paddingHorizontal: DIMENTIONS.APP_PADDING + 6,
						justifyContent: "space-between",
					}}
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
					
				</View>
			</Modal>
		</View>
	);
};

export default AlbumScreen;
