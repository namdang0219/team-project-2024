import { View, FlatList, Image, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "layout/Header";
import { userMocks } from "mock/userMocks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DIMENTIONS } from "constant/dimention";
import { useItemWidth } from "hook/useItemWidth";
import { CustomTouchableOpacity } from "components/custom";
import { useNavigation } from "@react-navigation/native";

const GAP = 10;

const FriendListScreen = () => {
	const insets = useSafeAreaInsets();
	const itemWidth = useItemWidth(GAP, 3);
	const { navigate } = useNavigation<any>();

	const styles = StyleSheet.create({
		container: {
			paddingTop: insets.top + DIMENTIONS.HEADER_HEIGHT,
			paddingHorizontal: DIMENTIONS.APP_PADDING,
			gap: GAP + 15,
			paddingBottom: 100,
		},
		image: {
			width: itemWidth,
			aspectRatio: 1,
			borderRadius: 1000,
		},
		title: {
			marginTop: 10,
			fontSize: 16,
			fontWeight: "500",
			textAlign: "center",
		},
	});

	return (
		<View style={{ flex: 1 }}>
			<Header
				canGoBack
				leftTitle={"Album"}
				leftTitleStyle={{ color: "black" }}
				backIconColor="black"
			/>

			<FlatList
				data={userMocks}
				keyExtractor={(item) => String(item.id)}
				numColumns={3}
				contentContainerStyle={styles.container}
				columnWrapperStyle={{
					gap: GAP,
				}}
				renderItem={({ item }) => (
					<View key={item.id}>
						<CustomTouchableOpacity
							onPress={() =>
								navigate("GlobalStack", {
									screen: "AlbumWithFriend",
									params: { userId: item.id },
								})
							}
						>
							<Image
								source={{ uri: item.avatar }}
								style={styles.image}
							/>
						</CustomTouchableOpacity>
						<Text numberOfLines={1} style={styles.title}>
							{item.name}
						</Text>
					</View>
				)}
			/>
		</View>
	);
};

export default FriendListScreen;
