import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { userMocks } from "mock/userMocks";
import { ThemedText } from "components/themed";

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
				<ThemedText style={{ fontSize: 18, fontWeight: "600" }}>友達と</ThemedText>
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
								screen: "AlbumWithFriendScreen",
								params: { userId: item.uid },
							})
						}
					>
						<Image
							source={{
								uri: item.photoURL,
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
						<ThemedText
							style={{
								textAlign: "center",
								fontSize: 12,
								marginTop: 8,
							}}
							numberOfLines={1}
						>
							{item.displayName}
						</ThemedText>
					</CustomTouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default WithFriend;
