import { View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { IAlbum } from "types/IAlbum";
import Header from "layout/Header";
import { userMocks } from "mock/userMocks";
import { AlbumList } from "components/list";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { AlbumType } from "types/AlbumType";

const AlbumWithFriendScreen = () => {
	const { params } = useRoute<any>();
	const albums = useSelector((state: RootState) => state.albums);

	const filteredUser = userMocks.find((u) => u.uid === params.userId);

	const filteredAlbums: AlbumType[] =
		(albums &&
			albums.filter((a: AlbumType) =>
				a.taggedFriends.includes(params?.userId)
			)) ||
		[];

	return (
		<View style={{ flex: 1 }}>
			<Header
				canGoBack
				leftTitle={filteredUser?.displayName}
				leftTitleStyle={{ color: "black" }}
				backIconColor="black"
			/>

			<AlbumList data={filteredAlbums} />
		</View>
	);
};

export default AlbumWithFriendScreen;
