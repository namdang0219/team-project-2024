import { View } from "react-native";
import React from "react";
import Header from "layout/Header";
import { albumMocks } from "mock/albumMocks";
import { AlbumList } from "components/list";

const AlbumListScreen = () => {
	return (
		<View style={{ flex: 1 }}>
			<Header
				leftTitle="Album"
				canGoBack
				leftTitleStyle={{ color: "black" }}
				backIconColor="black"
			/>

			<AlbumList data={albumMocks}></AlbumList>
		</View>
	);
};

export default AlbumListScreen;
