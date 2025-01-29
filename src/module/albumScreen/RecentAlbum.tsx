import {
	View,
	Text,
	FlatList,
	ImageBackground,
	StyleSheet,
} from "react-native";
import React from "react";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ThemedText } from "components/themed";
import { useAlbum } from "context/album-context";
import { Skeleton } from "components/skeleton";
import { customStyle } from "style/customStyle";
import { lightTheme } from "util/theme/themeColors";

const RecentAlbum = () => {
	const { navigate } = useNavigation<any>();
	const { colors } = useTheme();
	const { albums, fetchingAlbums } = useAlbum();

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
					最近のアルバム
				</ThemedText>
				<CustomTouchableOpacity
					onPress={() =>
						navigate("GlobalStack", {
							screen: "AlbumListScreen",
							params: {
								type: "recent",
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
			{!fetchingAlbums ? (
				<FlatList
					data={albums.slice(0, 5)}
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
								style={styles.cover}
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
				<View
					style={{
						paddingHorizontal: DIMENTIONS.APP_PADDING,
						gap: 10,
						marginTop: 12,
					}}
				>
					<Skeleton width={150} height={180} />
				</View>
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
	cover: {
		width: 150,
		height: 180,
		borderRadius: 12,
		position: "relative",
		overflow: "hidden",
		backgroundColor: lightTheme.colors.input
	},
});

export default RecentAlbum;
