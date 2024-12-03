import {
	View,
	Text,
	FlatList,
	Image,
	Dimensions,
	ImageBackground,
} from "react-native";
import React from "react";
import Header from "layout/Header";
import { albumMocks } from "mock/albumMocks";
import { CustomTouchableOpacity } from "components/custom";
import { DIMENTIONS } from "constant/dimention";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("screen");
const GAP = 8;
const ITEM_PER_ROW = 2;
const ITEM_WIDTH =
	(width - DIMENTIONS.APP_PADDING * 2 - GAP * (ITEM_PER_ROW - 1)) /
	ITEM_PER_ROW;

const AlbumListScreen = () => {
	const insets = useSafeAreaInsets();
	const { navigate } = useNavigation<any>();

	return (
		<View style={{ flex: 1 }}>
			<Header
				leftTitle="Album"
				canGoBack
				leftTitleStyle={{ color: "black" }}
				backIconColor="black"
			/>

			<FlatList
				data={albumMocks}
				numColumns={2}
				columnWrapperStyle={{ gap: GAP }}
				contentContainerStyle={{
					paddingHorizontal: DIMENTIONS.APP_PADDING,
					gap: GAP,
					paddingTop: DIMENTIONS.HEADER_HEIGHT + insets.top,
					paddingBottom: 100,
				}}
				renderItem={({ item, index }) => (
					<CustomTouchableOpacity
						key={item.id}
						style={{ marginBottom: 10 }}
						onPress={() =>
							navigate("GlobalStack", {
								screen: "AlbumDetailScreen",
								params: { albumId: item.id },
							})
						}
					>
						<ImageBackground
							source={{ uri: item.cover }}
							style={{
								flex: 1,
								borderRadius: 15,
								width: ITEM_WIDTH,
								height: (ITEM_WIDTH / 5) * 6,
								position: "relative",
								overflow: "hidden",
							}}
						>
							{item.favorite && (
								<View
									style={{
										width: 25,
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
						<Text
							numberOfLines={1}
							style={{
								fontSize: 16,
								fontWeight: "medium",
								marginTop: 6,
							}}
						>
							{item.title}
						</Text>
					</CustomTouchableOpacity>
				)}
			/>
		</View>
	);
};

export default AlbumListScreen;
