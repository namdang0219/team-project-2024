import {
	View,
	Text,
	SafeAreaView,
	useWindowDimensions,
	Modal,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { darkTheme } from "util/theme/themeColors";
import { CustomTouchableOpacity } from "components/custom";
import { AntDesign, Feather, FontAwesome6, Fontisto } from "@expo/vector-icons";
import { customStyle } from "style/customStyle";
import { IImage } from "types/IImage";
import { AutoHeightImage } from "components/image";
import { useTheme } from "@react-navigation/native";
import { DIMENTIONS } from "constant/dimention";
import ImageEditScreen from "./ImageEditScreen";

const ImageViewScreen = ({
	selectedImageData,
	setShowImageModal,
}: {
	selectedImageData: IImage | undefined;
	setShowImageModal: Dispatch<SetStateAction<boolean>>;
}) => {
	const { width } = useWindowDimensions();
	const { colors } = useTheme();
	const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
	const handleBackButton = () => {
		setShowImageModal(false);
	};
	const [favorite, setFavorite] = useState<boolean>(false);

	if (!selectedImageData) {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: darkTheme.colors.background,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text style={{ color: "white" }}>
					画像が見つかりませんでした
				</Text>
			</View>
		);
	}

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: darkTheme.colors.background }}
		>
			<StatusBar style="light" />
			<View style={{ width, aspectRatio: "9/16", flexShrink: 0 }}>
				<View
					style={{
						flex: 1,
						position: "relative",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{/* top bar  */}
					<View
						style={[
							{
								height: 50,
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								paddingHorizontal: 10,
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								zIndex: 1000,
							},
						]}
					>
						{/* x mark  */}
						<CustomTouchableOpacity onPress={handleBackButton}>
							<Feather
								name="x"
								size={30}
								color={"white"}
								style={customStyle.shadow}
							/>
						</CustomTouchableOpacity>
						{/* edit button  */}
						<CustomTouchableOpacity
							onPress={() => setEditModalOpen(true)}
						>
							<Text
								style={{
									color: "white",
									fontSize: 18,
									...customStyle.shadow,
								}}
							>
								<Feather
									name="edit"
									color={"white"}
									size={26}
								/>
							</Text>
						</CustomTouchableOpacity>
					</View>
					{/* image view  */}
					<AutoHeightImage
						source={{ uri: selectedImageData.uri }}
						style={{ backgroundColor: "#0000003d" }}
					/>

					{/* bottom bar  */}
				</View>
			</View>
			<View
				style={{
					flex: 1,
					borderTopColor: colors.icon,
					borderTopWidth: 0.2,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					paddingHorizontal: DIMENTIONS.APP_PADDING + 40,
				}}
			>
				<CustomTouchableOpacity onPress={() => setFavorite(!favorite)}>
					<FontAwesome6
						name="location-dot"
						size={24}
						color={"white"}
						style={{ opacity: 0.6 }}
					/>
				</CustomTouchableOpacity>
				<CustomTouchableOpacity onPress={() => setFavorite(!favorite)}>
					<AntDesign
						name={favorite ? "heart" : "hearto"}
						color={favorite ? "red" : "white"}
						size={24}
					/>
				</CustomTouchableOpacity>
				<CustomTouchableOpacity onPress={() => setFavorite(!favorite)}>
					<Fontisto
						name="share-a"
						size={24}
						color="white"
						style={{ opacity: 0.6 }}
					/>
				</CustomTouchableOpacity>
			</View>

			<Modal visible={editModalOpen}>
				<ImageEditScreen
					selectedImageData={selectedImageData}
					setEditModalOpen={setEditModalOpen}
				/>
			</Modal>
		</SafeAreaView>
	);
};

export default ImageViewScreen;
