import { View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { albumMocks } from "mock/albumMocks";
import { Album } from "types/Album";
import Header from "layout/Header";
import { userMocks } from "mock/userMocks";
import { AlbumList } from "components/list";

const AlbumWithFriend = () => {
	const { params } = useRoute<any>();

	const filteredUser = userMocks.find((u) => u.id === params.userId);

	const filteredAlbums: Album[] = albumMocks.filter((a: Album) =>
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
