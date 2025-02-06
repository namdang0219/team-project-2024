import { View, Text, FlatList, ImageBackground } from "react-native";
import React from "react";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { ThemedText } from "components/themed";
import { UserType } from "types/UserType";

const RecentAlbum = () => {
	const { navigate } = useNavigation<any>();
	const { colors } = useTheme();
	const albums = useSelector((state: RootState) => state.albums);
	const user = useSelector((state: RootState) => state.user as UserType);

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
			{albums && albums?.length !== 0 ? (
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
								style={{
									width: 150,
									height: 180,
									borderRadius: 12,
									position: "relative",
									overflow: "hidden",
									backgroundColor: colors.input,
								}}
							>
								{user.favorites.includes(item.aid) && (
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
						paddingHorizontal: DIMENTIONS.APP_PADDING,
						gap: 10,
						marginTop: 12,
					}}
				>
					<View
						style={{
							width: 150,
							height: 180,
							backgroundColor: colors.input,
							alignItems: "center",
							justifyContent: "center",
							borderRadius: 12,
						}}
					>
						<AntDesign name="plus" size={30} color={colors.icon} />
					</View>
				</CustomTouchableOpacity>
			)}
		</View>
	);
};

export default RecentAlbum;
