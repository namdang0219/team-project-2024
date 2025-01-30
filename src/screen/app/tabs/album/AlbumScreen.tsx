import {
	View,
	Text,
	useWindowDimensions,
	ScrollView,
	Modal,
	RefreshControl,
	TouchableWithoutFeedback,
	Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DIMENTIONS } from "constant/dimention";
import { Feather, MaterialIcons } from "@expo/vector-icons";
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
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { useTheme } from "@react-navigation/native";
import { useAlbum } from "context/album-context";
import FirstAlbumScreen from "screen/app/global/FirstAlbumScreen";

const AlbumScreen = () => {
	const { albums, fetchingAlbums, refreshAlbums } = useAlbum();
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();
	const [createAlbumModal, setCreateAlbumModal] = useState<boolean>(false);
	const [searchModal, toggleSearchModal] = useToggle(false);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const { colors } = useTheme();
	const images = useSelector((state: RootState) => state.image);

	const [firstAlbumModalOpen, setFirstAlbumModalOpen] =
		useState<boolean>(false);

	const toggleCreateAlbumModal = () => {
		setCreateAlbumModal(false);
	};

	const options: IOption[] = [
		{
			label: "アルバム作成",
			icon: <MaterialIcons name="create" color={"black"} size={20} />,
			action: () => setCreateAlbumModal(true),
		},
	];

	const onRefresh = () => {
		setIsRefreshing(true);
		refreshAlbums();
		setIsRefreshing(false);
	};

	useEffect(() => {
		if (!fetchingAlbums && albums.length == 0) {
			setFirstAlbumModalOpen(true);
		}
	}, [albums, fetchingAlbums]);

	const toggleFirstAlbumModal = () => {
		setFirstAlbumModalOpen(false);
	};

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
								<Feather
									name="search"
									size={24}
									color={colors.text}
								/>
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
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={onRefresh}
						progressViewOffset={
							insets.top + DIMENTIONS.HEADER_HEIGHT
						}
					/>
				}
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
						{`${albums.length}アルバム、${images.length}記念`}
					</Text>
				</View>
			</ScrollView>

			{/* first album modal  */}
			{!fetchingAlbums && albums.length == 0 && (
				<Modal visible={firstAlbumModalOpen} animationType="slide">
					<FirstAlbumScreen
						toggleFirstAlbumModal={toggleFirstAlbumModal}
					/>
				</Modal>
			)}
		</View>
	);
};

export default AlbumScreen;
