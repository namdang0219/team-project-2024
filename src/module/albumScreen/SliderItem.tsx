import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { CustomTouchableOpacity } from "components/custom";
import { useNavigation } from "@react-navigation/native";
import { IAlbum } from "types/IAlbum";

const SliderItem = ({ item }: { item: IAlbum }) => {
	const { navigate } = useNavigation<any>();

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
					uri: item.cover,
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
						style={{
							fontSize: 28,
							color: "white",
							fontWeight: "600",
						}}
					>
						{item.title}
					</Text>
					<Text
						style={{ color: "white", fontSize: 16 }}
					>{`${item.images.length}枚`}</Text>
				</View>
			</ImageBackground>
		</View>
	);
};

export default SliderItem;
