import { View } from "react-native";
import React from "react";
import Header from "layout/Header";
import { AlbumList } from "components/list";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";

const AlbumListScreen = () => {
	const albums = useSelector((state: RootState) => state.album)

	return (
		<View style={{ flex: 1 }}>
			<Header
				leftTitle="Album"
				canGoBack
				leftTitleStyle={{ color: "black" }}
				backIconColor="black"
			/>

			<AlbumList data={albums}></AlbumList>
		</View>
	);
};

export default AlbumListScreen;
