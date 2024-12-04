import { View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { albumMocks } from "mock/albumMocks";
import { IAlbum } from "types/IAlbum";
import Header from "layout/Header";
import { userMocks } from "mock/userMocks";
import { AlbumList } from "components/list";

const AlbumWithFriend = () => {
	const { params } = useRoute<any>();

	const filteredUser = userMocks.find((u) => u.id === params.userId);

	const filteredAlbums: IAlbum[] = albumMocks.filter((a: IAlbum) =>
		a.taggedFriends.includes(params?.userId)
	);

	return (
		<View style={{ flex: 1 }}>
			<Header
				canGoBack
				leftTitle={filteredUser?.name}
				leftTitleStyle={{ color: "black" }}
				backIconColor="black"
			/>

			<AlbumList data={filteredAlbums} />
		</View>
	);
};

export default AlbumWithFriend;
