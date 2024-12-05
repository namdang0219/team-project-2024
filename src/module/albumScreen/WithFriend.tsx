import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { userMocks } from "mock/userMocks";

const width = Dimensions.get("screen").width;

const WithFriend = () => {
	const { colors } = useTheme();
	const { navigate } = useNavigation<any>();

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
				<Text style={{ fontSize: 18, fontWeight: "600" }}>友達と</Text>
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
					<Text style={{ color: colors.primary }}>すべて</Text>
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
	);
};

export default WithFriend;
