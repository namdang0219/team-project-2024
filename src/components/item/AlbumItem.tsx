import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { IAlbum } from "types/IAlbum";
import { useItemWidth } from "hook/useItemWidth";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { UserDataType } from "types/UserDataType";

const AlbumItem = ({
	item,
	toggleSeachModal,
}: {
	item: IAlbum;
	toggleSeachModal: Dispatch<SetStateAction<boolean>>;
}) => {
	const { navigate } = useNavigation<any>();
	const user = useSelector((state: RootState) => state.user as UserDataType);
	const itemWidth = useItemWidth(DIMENTIONS.LIST_GAP, 2);
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		background: {
			flex: 1,
			borderRadius: 15,
			width: itemWidth,
			height: (itemWidth / 5) * 6,
			position: "relative",
			overflow: "hidden",
			backgroundColor: colors.input,
		},
		heartContainer: {
			width: 25,
			aspectRatio: 1,
			backgroundColor: "white",
			borderRadius: 1000,
			alignItems: "center",
			justifyContent: "center",
			position: "absolute",
			bottom: 6,
			right: 6,
		},
		title: {
			fontSize: 16,
			fontWeight: "medium",
			marginTop: 6,
		},
	});

	return (
		<CustomTouchableOpacity
			key={item.aid}
			style={{ marginBottom: 10 }}
			onPress={() => {
				navigate("GlobalStack", {
					screen: "AlbumDetailScreen",
					params: { aid: item.aid },
				});
				toggleSeachModal(false);
			}}
		>
			<ImageBackground
				source={{ uri: item.cover.uri }}
				style={styles.background}
			>
				{user.favorites.includes(item.aid) && (
					<View style={styles.heartContainer}>
						<AntDesign name="heart" color={"red"} />
					</View>
				)}
			</ImageBackground>
			<Text numberOfLines={1} style={styles.title}>
				{item.title}
			</Text>
		</CustomTouchableOpacity>
	);
};

export default AlbumItem;
