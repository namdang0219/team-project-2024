import { View, Text, FlatList, ImageBackground } from "react-native";
import React from "react";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ThemedText } from "components/themed";
import { useAlbum } from "context/album-context";
import { StyleSheet } from "react-native";
import { customStyle } from "style/customStyle";

const FavoriteAlbum = () => {
	const { albums } = useAlbum();
	const { navigate } = useNavigation<any>();
	const { colors } = useTheme();

	const favoriteAlbums = albums.filter((a) => a.favorite === true);

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
				<ThemedText style={{ fontSize: 18, fontWeight: "600" }}>
					お気に入り
				</ThemedText>
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
			{favoriteAlbums.length > 0 ? (
				<FlatList
					data={favoriteAlbums.slice(0, 5)}
					contentContainerStyle={{
						paddingHorizontal: DIMENTIONS.APP_PADDING,
						gap: 10,
						marginTop: 12,
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
									uri: item.cover.uri,
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
									<View style={[styles.favoriteContainer, customStyle.shadow]}>
										<AntDesign name="heart" color={"red"} />
									</View>
								)}
							</ImageBackground>
						</CustomTouchableOpacity>
					)}
				/>
			) : (
				<CustomTouchableOpacity
					style={{
						width: 150,
						height: 180,
						borderRadius: 12,
						backgroundColor: colors.input,
						marginHorizontal: DIMENTIONS.APP_PADDING,
						gap: 10,
						marginTop: 12,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<AntDesign name="plus" color={colors.icon} size={30} />
				</CustomTouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	favoriteContainer: {
		width: 24,
		aspectRatio: 1,
		backgroundColor: "white",
		borderRadius: 1000,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		bottom: 6,
		right: 6,
	},
});

export default FavoriteAlbum;
