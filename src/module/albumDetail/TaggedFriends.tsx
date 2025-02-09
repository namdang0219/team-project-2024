import { View, Text, Image, StyleSheet, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { UserType } from "types/UserType";
import { CustomTouchableOpacity } from "components/custom";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import AlbumTagFriendModal from "screen/app/tabs/album/modal/AlbumTagFriendModal";
import { useToggle } from "hook/useToggle";
import { AlbumType } from "types/AlbumType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/configureStore";
import { updateAlbum } from "store/album/albumSlice";
import { userMocks } from "mock/userMocks";

const TaggedFriends = ({ aid }: { aid: string }) => {
	const { colors } = useTheme();
	const dispatch = useDispatch<AppDispatch>();
	const albums = useSelector(
		(state: RootState) => state.albums as AlbumType[]
	);

	const filteredAlbum = albums.find((item: AlbumType) => item.aid === aid);

	const [tagFriendModal, toggleTagFriendModal] = useToggle(false);
	const [taggedFriendId, setTaggedFriendId] = useState<AlbumType["aid"][]>(
		filteredAlbum?.taggedFriends || []
	);

	useEffect(() => {
		if (!filteredAlbum) return;
		dispatch(
			updateAlbum({
				...filteredAlbum,
				update_at: Date.now(),
				taggedFriends: taggedFriendId,
			})
		);
	}, [taggedFriendId]);

	const taggedFriendData = userMocks.filter((u) =>
		filteredAlbum?.taggedFriends.includes(u.uid)
	);

	return (
		<>
			<CustomTouchableOpacity
				style={{ flexDirection: "row" }}
				onPress={() => {
					toggleTagFriendModal();
				}}
			>
				{taggedFriendData.length > 0 &&
					taggedFriendData.slice(0, 3).map((f: UserType, index) => (
						<View
							key={f.uid}
							style={[
								styles.taggedFriendContainer,
								{
									marginLeft: index == 0 ? 0 : -20,
								},
							]}
						>
							<Image
								source={{
									uri: f?.photoURL,
								}}
								style={{
									flex: 1,
									borderRadius: 1000,
								}}
							/>
						</View>
					))}
				{taggedFriendData.length > 3 && (
					<View style={styles.taggedFriendNum4}>
						<Image
							source={{
								uri: taggedFriendData[3].photoURL,
							}}
							style={[
								{
									flex: 1,
									borderRadius: 1000,
								},
								StyleSheet.absoluteFill,
							]}
						/>
						<View
							style={[
								{
									backgroundColor: "black",
									opacity: 0.35,
								},
								StyleSheet.absoluteFill,
							]}
						/>
						<AntDesign name="plus" size={24} color={"white"} />
					</View>
				)}
				{taggedFriendData.length == 0 && (
					<View
						style={[
							styles.taggedFriendNum4,
							{
								backgroundColor: colors.input,
								marginLeft: 0,
							},
						]}
					>
						<View
							style={[
								{
									backgroundColor: "black",
									opacity: 0.35,
								},
								StyleSheet.absoluteFill,
							]}
						/>
						<AntDesign name="plus" size={24} color={"white"} />
					</View>
				)}
			</CustomTouchableOpacity>

			<Modal
				visible={tagFriendModal}
				animationType="slide"
				presentationStyle="formSheet"
			>
				<AlbumTagFriendModal
					toggleTagFriendModal={toggleTagFriendModal}
					taggedFriendId={taggedFriendId}
					setTaggedFriendId={setTaggedFriendId}
				/>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	taggedFriendContainer: {
		width: 45,
		aspectRatio: 1,
		borderColor: "white",
		backgroundColor: "white",
		borderWidth: 2,
		borderRadius: 1000,
		overflow: "hidden",
	},
	taggedFriendNum4: {
		width: 45,
		aspectRatio: 1,
		borderColor: "white",
		backgroundColor: "white",
		borderWidth: 2,
		borderRadius: 1000,
		overflow: "hidden",
		marginLeft: -20,
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default TaggedFriends;
