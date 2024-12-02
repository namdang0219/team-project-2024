import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";
import { Button } from "components/button";
import { DIMENTIONS } from "constant/dimention";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "layout/Header";
import { CustomTouchableOpacity } from "components/custom";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useToggle } from "hook/useToggle";
import { useNavigation, useRoute } from "@react-navigation/native";
import { albumMocks } from "mock/albumMocks";

const AlbumDetailScreen = () => {
	const { width } = useWindowDimensions();
	const insets = useSafeAreaInsets();
	const [showOption, toggleShowOption] = useToggle(false);
	const { navigate } = useNavigation<any>();
	const { params } = useRoute<any>();

	const filteredAlbum = albumMocks.find(
		(item) => item.id === params?.albumId
	);

	return (
		<>

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
					<View style={{ paddingTop: insets.top, position: "absolute" }}>
						<Header
							leftTitle="Album"
							canGoBack
							intensity={0}
							leftTitleStyle={{
								shadowOpacity: 0.5
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
														borderBottomColor: "white",
														borderBottomWidth: 0.5,
													},
												]}
												onPress={() => toggleShowOption()}
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
							}
						></Header>
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
						style={{ fontSize: 22, fontWeight: "600" }}
						numberOfLines={2}
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
