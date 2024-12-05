import { View, Text, FlatList, ImageBackground } from "react-native";
import React from "react";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { useNavigation, useTheme } from "@react-navigation/native";

const FavoriteAlbum = () => {
	const albums = useSelector((state: RootState) => state.album);
	const { navigate } = useNavigation<any>();
	const { colors } = useTheme();

	return (
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
					onPress={() =>
						navigate("GlobalStack", {
							screen: "AlbumListScreen",
							params: {
								type: "favorites",
							},
						})
					}
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 4,
					}}
				>
					<Text style={{ color: colors.primary }}>すべて</Text>
					<Entypo
						name="chevron-thin-right"
						size={14}
						color={colors.primary}
					/>
				</CustomTouchableOpacity>
			</View>
			<FlatList
				data={albums.filter((a) => a.favorite === true).slice(0, 5)}
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
								params: { aid: item.aid },
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
	);
};

export default FavoriteAlbum;
