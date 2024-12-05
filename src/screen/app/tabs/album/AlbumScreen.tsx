import {
	View,
	Text,
	useWindowDimensions,
	ScrollView,
	Modal,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DIMENTIONS } from "constant/dimention";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import { CustomTouchableOpacity } from "components/custom";
import { useNavigation, useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { useToggle } from "hook/useToggle";
import Header from "layout/Header";
import AlbumSearch from "./AlbumSearch";
import AlbumCreateModal from "./modal/AlbumCreateModal";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import Slider from "module/albumScreen/Slider";
import RecentAlbum from "module/albumScreen/RecentAlbum";
import WithFriend from "module/albumScreen/WithFriend";
import FavoriteAlbum from "module/albumScreen/FavoriteAlbum";
import Category from "module/albumScreen/Category";

const AlbumScreen = () => {
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();
	const [showOption, toggleShowOption, setShowOption] = useToggle(false);
	const [createAlbumModal, toggleCreateAlbumModal] = useToggle(false);
	const [searchModal, toggleSearchModal] = useToggle(false);

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
							<View>
								<CustomTouchableOpacity
									style={{ position: "relative" }}
									onPress={toggleShowOption}
								>
									<Entypo
										name="dots-three-horizontal"
										size={20}
									/>
								</CustomTouchableOpacity>

								{/* option modal  */}
								{showOption && (
									<BlurView
										style={{
											width: (width / 3) * 1.6,
											borderRadius: 10,
											position: "absolute",
											right: -10,
											top: 30,
											paddingHorizontal: 15,
											overflow: "hidden",
										}}
										tint="extraLight"
										intensity={95}
									>
										<CustomTouchableOpacity
											style={[
												{
													height: 48,
													flexDirection: "row",
													alignItems: "center",
													justifyContent:
														"space-between",
													borderBottomColor: "white",
													borderBottomWidth: 0.5,
												},
											]}
											onPress={() =>
												toggleCreateAlbumModal()
											}
										>
											<Text>アルバム作成</Text>
											<MaterialIcons
												name="create"
												color={"black"}
												size={20}
											/>
										</CustomTouchableOpacity>
									</BlurView>
								)}
							</View>
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
				onScroll={() => {
					showOption && setShowOption(false);
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
					<Category/>

					{/* storage  */}
					<Text style={{ color: "gray", textAlign: "center" }}>
						11アルバム、400記念
					</Text>
				</View>
			</ScrollView>

			<Modal
				visible={createAlbumModal}
				animationType="slide"
				presentationStyle="fullScreen"
			>
				<AlbumCreateModal
					toggleCreateAlbumModal={toggleCreateAlbumModal}
				/>
			</Modal>
		</View>
	);
};

export default AlbumScreen;
