import {
	View,
	Text,
	Image,
	TouchableWithoutFeedback,
	TextInput,
	FlatList,
	StyleSheet,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { DIMENTIONS } from "constant/dimention";
import { Feather } from "@expo/vector-icons";
import { CustomTouchableOpacity } from "components/custom";
import handlePressBackground from "util/func/handlePressBackground";
import { useTheme } from "@react-navigation/native";
import { userMocks } from "mock/userMocks";
import { IUser } from "types/IUser";
import { Button } from "components/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserType } from "types/UserType";

const AlbumTagFriendModal = ({
	toggleTagFriendModal,
	taggedFriendId,
	setTaggedFriendId,
}: {
	toggleTagFriendModal: () => void;
	taggedFriendId: UserType["uid"][];
	setTaggedFriendId: Dispatch<SetStateAction<IUser["uid"][]>>;
}) => {
	const insets = useSafeAreaInsets();

	return (
		<TouchableWithoutFeedback onPress={handlePressBackground}>
			{/* content  */}
			<View style={{ flex: 1, marginHorizontal: DIMENTIONS.APP_PADDING }}>
				<View style={styles.searchContainer}>
					<TextInput
						placeholder="友達を検索"
						placeholderTextColor={"#9ca3af"}
						style={styles.textInput}
					/>
					<Feather
						name="search"
						size={20}
						style={styles.searchIcon}
					/>
				</View>

				<FlatList
					data={userMocks}
					style={{ marginTop: 6 }}
					keyExtractor={(item) => String(item.uid)}
					contentContainerStyle={styles.contentContainer}
					renderItem={({ item }: { item: UserType }) => (
						<UserItem
							item={item}
							taggedFriendId={taggedFriendId}
							setTaggedFriendId={setTaggedFriendId}
						/>
					)}
				/>

				<Button
					onPress={toggleTagFriendModal}
					style={{ marginBottom: insets.bottom + 4, marginTop: 10 }}
				>
					完成
				</Button>
			</View>
		</TouchableWithoutFeedback>
	);
};

const UserItem = ({
	item,
	taggedFriendId,
	setTaggedFriendId,
}: {
	item: UserType;
	taggedFriendId: IUser["uid"][];
	setTaggedFriendId: Dispatch<SetStateAction<IUser["uid"][]>>;
}) => {
	const { colors } = useTheme();

	const isTagged = taggedFriendId.includes(item.uid);

	const handleTagFriend = () => {
		if (isTagged) {
			setTaggedFriendId((prev) => prev.filter((i) => i != item.uid));
		} else {
			setTaggedFriendId((prev) => [...prev, item.uid]);
		}
	};

	return (
		<TouchableWithoutFeedback>
			<View
				style={{
					paddingVertical: 5,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 10,
					}}
				>
					<Image
						source={{
							uri: item.photoURL,
						}}
						style={{
							width: 52,
							aspectRatio: "1/1",
							borderRadius: 1000,
						}}
					/>
					<Text style={{ fontSize: 15 }}>{item.displayName}</Text>
				</View>

				<CustomTouchableOpacity
					onPress={handleTagFriend}
					activeOpacity={isTagged ? 1 : 0.8}
					style={{
						backgroundColor: isTagged
							? colors.input
							: colors.primary,
						width: 60,
						paddingVertical: 5,
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 5,
					}}
				>
					<Text
						style={{
							color: isTagged ? "gray" : "white",
							fontWeight: "500",
						}}
					>
						{isTagged ? "削除" : "タグ"}
					</Text>
				</CustomTouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	searchContainer: {
		marginTop: 20,
		position: "relative",
	},
	textInput: {
		backgroundColor: "rgba(0,0,0,0.05)",
		height: 35,
		paddingHorizontal: 14,
		borderRadius: 6,
		color: "white",
	},
	searchIcon: {
		position: "absolute",
		right: 10,
		top: 7,
		color: "gray",
	},
	contentContainer: {
		paddingVertical: 5,
		flexGrow: 1,
	},
});

export default AlbumTagFriendModal;
