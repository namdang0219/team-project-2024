import { Alert, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "layout/Header";
import { AlbumList } from "components/list";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { useRoute } from "@react-navigation/native";
import { IAlbum } from "types/IAlbum";

const AlbumListScreen = () => {
	const albums = useSelector((state: RootState) => state.album);
	const { params } = useRoute<any>();
	const [displayAlbums, setDisplayAlbums] = useState<IAlbum[]>([]);

	useEffect(() => {
		if (params.type === "recent") {
			setDisplayAlbums(albums);
		} else if (params.type === "favorites") {
			const favoriteAlbums = albums.filter(
				(a: IAlbum) => a.favorite == true
			);
			setDisplayAlbums(favoriteAlbums);
		} else {
			Alert.alert("読み込み失敗")
		}
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<Header
				leftTitle="Album"
				canGoBack
				leftTitleStyle={{ color: "black" }}
				backIconColor="black"
			/>

			<AlbumList data={displayAlbums}></AlbumList>
		</View>
	);
};

export default AlbumListScreen;
