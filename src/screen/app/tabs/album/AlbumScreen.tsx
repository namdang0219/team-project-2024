import {
	View,
	Text,
	useWindowDimensions,
	ScrollView,
	Modal,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DIMENTIONS } from "constant/dimention";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import { CustomTouchableOpacity } from "components/custom";
import { BlurView } from "expo-blur";
import { useToggle } from "hook/useToggle";
import Header from "layout/Header";
import AlbumSearch from "./AlbumSearch";
import AlbumCreateModal from "./modal/AlbumCreateModal";
import Slider from "module/albumScreen/Slider";
import RecentAlbum from "module/albumScreen/RecentAlbum";
import WithFriend from "module/albumScreen/WithFriend";
import FavoriteAlbum from "module/albumScreen/FavoriteAlbum";
import Category from "module/albumScreen/Category";
import { OptionModal } from "components/modal";
import { IOption } from "components/modal/OptionModal";

const AlbumScreen = () => {
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();
	const [createAlbumModal, toggleCreateAlbumModal] = useToggle(false);
	const [searchModal, toggleSearchModal] = useToggle(false);

	const options: IOption[] = [
		{
			label: "アルバム作成",
			icon: <MaterialIcons name="create" color={"black"} size={20} />,
			action: toggleCreateAlbumModal,
		},
	];

	return (
		<View style={{ flex: 1 }}>
			{/* header : top + 50  */}
			<BlurView
				style={{
					paddingTop: insets.top,
					position: "absolute",
					top: 0,
					zIndex: 1000,
					width,
				}}
				intensity={100}
				tint="light"
			>
				{/* header container  */}

				<Header
					title="Album"
					rightContainer={
						<View
							style={[
								{
									flexDirection: "row",
									alignItems: "center",
									gap: 20,
								},
							]}
						>
							{/* search  */}
							<CustomTouchableOpacity onPress={toggleSearchModal}>
								<Feather name="search" size={24} />
							</CustomTouchableOpacity>

							{/* option  */}
							<OptionModal options={options}>
								<Modal
									visible={createAlbumModal}
									animationType="slide"
									presentationStyle="fullScreen"
								>
									<AlbumCreateModal
										toggleCreateAlbumModal={
											toggleCreateAlbumModal
										}
									/>
								</Modal>
							</OptionModal>
						</View>
					}
				/>

				{/* search modal  */}
				<Modal
					visible={searchModal}
					presentationStyle="fullScreen"
					animationType="fade"
				>
					<AlbumSearch
						toggleSeachModal={toggleSearchModal}
					></AlbumSearch>
				</Modal>
			</BlurView>
			<ScrollView
				style={{
					flex: 1,
					paddingTop: insets.top + DIMENTIONS.HEADER_HEIGHT,
				}}
			>
				<View style={{ flex: 1, gap: 35, paddingBottom: 250 }}>
					<Slider />

					{/* recent album  */}
					<RecentAlbum />

					{/* with friend  */}
					<WithFriend />

					{/* favorite album  */}
					<FavoriteAlbum />

					{/* category  */}
					<Category />

					{/* storage  */}
					<Text style={{ color: "gray", textAlign: "center" }}>
						11アルバム、400記念
					</Text>
				</View>
			</ScrollView>
		</View>
	);
};

export default AlbumScreen;
