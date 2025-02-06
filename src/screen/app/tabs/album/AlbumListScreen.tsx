import { Alert, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "layout/Header";
import { AlbumList } from "components/list";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { useRoute } from "@react-navigation/native";
import { IAlbum } from "types/IAlbum";
import { UserType } from "types/UserType";

const AlbumListScreen = () => {
	const albums = useSelector((state: RootState) => state.albums as IAlbum[]);
	const { params } = useRoute<any>();
	const [displayAlbums, setDisplayAlbums] = useState<IAlbum[]>([]);
	const user = useSelector((state: RootState) => state.user as UserType);

	useEffect(() => {
		if (params.type === "recent") {
			setDisplayAlbums(albums);
		} else if (params.type === "favorites") {
			// const favoriteAlbums = albums.filter(
			// 	(a: IAlbum) => a.favorite == true
			// );
			// setDisplayAlbums(favoriteAlbums);
			const userFavorites = user.favorites;
			const favoriteAlbums = albums.filter((a: IAlbum) =>
				userFavorites.includes(a.aid)
			);
			setDisplayAlbums(favoriteAlbums);
		} else {
			Alert.alert("読み込み失敗");
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
