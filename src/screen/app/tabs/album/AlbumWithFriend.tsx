import { View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { IAlbum } from "types/IAlbum";
import Header from "layout/Header";
import { userMocks } from "mock/userMocks";
import { AlbumList } from "components/list";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";

const AlbumWithFriendScreen = () => {
	const { params } = useRoute<any>();
	const albums = useSelector((state: RootState) => state.album);

	const filteredUser = userMocks.find((u) => u.uid === params.userId);

	const filteredAlbums: IAlbum[] = albums.filter((a: IAlbum) =>
		a.taggedFriends.includes(params?.userId)
	);

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
