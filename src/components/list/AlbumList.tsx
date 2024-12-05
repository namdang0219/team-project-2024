import { FlatList } from "react-native";
import React from "react";
import { DIMENTIONS } from "constant/dimention";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AlbumItem } from "components/item";
import { IAlbum } from "types/IAlbum";

const AlbumList = ({ data }: { data: IAlbum[] }) => {
	const insets = useSafeAreaInsets();

	return (
		<FlatList
			data={data}
			numColumns={2}
			columnWrapperStyle={{ gap: DIMENTIONS.LIST_GAP }}
			contentContainerStyle={{
				paddingHorizontal: DIMENTIONS.APP_PADDING,
				gap: DIMENTIONS.LIST_GAP,
				paddingTop: DIMENTIONS.HEADER_HEIGHT + insets.top,
				paddingBottom: 100,
			}}
			renderItem={({ item }) => <AlbumItem key={item.id} item={item} />}
		/>
	);
};

export default AlbumList;
