import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	ActivityIndicator,
} from "react-native";
import React from "react";
import { IAlbum } from "types/IAlbum";
import { customStyle } from "style/customStyle";
import { useAlbum } from "context/album-context";
import { Skeleton } from "components/skeleton";

const SliderItem = ({ item }: { item: IAlbum }) => {
	const { fetchingAlbums } = useAlbum();

	if (fetchingAlbums) {
		return (
			<Skeleton
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<ActivityIndicator size={"large"} />
			</Skeleton>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				borderRadius: 10,
				overflow: "hidden",
			}}
		>
			<ImageBackground
				source={{
					uri: item.cover.uri,
				}}
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<View
					style={[
						{
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "rgba(0,0,0,0.15)",
						},
						StyleSheet.absoluteFill,
					]}
				>
					<Text
						style={[
							{
								fontSize: 28,
								color: "white",
								fontWeight: "600",
							},
							customStyle.shadow,
						]}
						numberOfLines={1}
					>
						{item.title}
					</Text>
					<Text
						style={[
							{ color: "white", fontSize: 16 },
							customStyle.shadow,
						]}
					>{`${item.images.length}枚`}</Text>
				</View>
			</ImageBackground>
		</View>
	);
};

export default SliderItem;
