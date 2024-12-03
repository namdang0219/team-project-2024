import {
	View,
	Text,
	ScrollView,
	useWindowDimensions,
	Dimensions,
	Image,
	StyleSheet,
	FlatList,
	StatusBar,
} from "react-native";
import React from "react";
import Header from "layout/Header";
import { DIMENTIONS } from "constant/dimention";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTouchableOpacity } from "components/custom";

const { width } = Dimensions.get("window");

const images = [
	{
		id: 1,
		uri: "https://i.pinimg.com/736x/41/f3/ca/41f3ca6cae04bca2ca1bb94bdf051ab8.jpg",
	},
	{
		id: 2,
		uri: "https://i.pinimg.com/736x/85/c6/e0/85c6e08b42d8567b5065ec37e6c315f4.jpg",
	},
	{
		id: 3,
		uri: "https://i.pinimg.com/736x/ae/48/30/ae4830da32a040561c632d204b6998d6.jpg",
	},
	{
		id: 4,
		uri: "https://i.pinimg.com/736x/9d/2d/94/9d2d94e023b9021d8f0a39b5d98f71cf.jpg",
	},
	{
		id: 5,
		uri: "https://i.pinimg.com/736x/4b/17/9e/4b179e31d2a98d5f69045ce6f941642f.jpg",
	},
	{
		id: 6,
		uri: "https://i.pinimg.com/736x/ad/6c/34/ad6c34d99197000f57891ef033cf3bbf.jpg",
	},
	{
		id: 7,
		uri: "https://i.pinimg.com/736x/41/f3/ca/41f3ca6cae04bca2ca1bb94bdf051ab8.jpg",
	},
	{
		id: 8,
		uri: "https://i.pinimg.com/736x/85/c6/e0/85c6e08b42d8567b5065ec37e6c315f4.jpg",
	},
	{
		id: 9,
		uri: "https://i.pinimg.com/736x/ae/48/30/ae4830da32a040561c632d204b6998d6.jpg",
	},
	{
		id: 10,
		uri: "https://i.pinimg.com/736x/9d/2d/94/9d2d94e023b9021d8f0a39b5d98f71cf.jpg",
	},
	{
		id: 11,
		uri: "https://i.pinimg.com/736x/4b/17/9e/4b179e31d2a98d5f69045ce6f941642f.jpg",
	},
	{
		id: 12,
		uri: "https://i.pinimg.com/736x/ad/6c/34/ad6c34d99197000f57891ef033cf3bbf.jpg",
	},
	{
		id: 13,
		uri: "https://i.pinimg.com/736x/85/c6/e0/85c6e08b42d8567b5065ec37e6c315f4.jpg",
	},
	{
		id: 14,
		uri: "https://i.pinimg.com/736x/ae/48/30/ae4830da32a040561c632d204b6998d6.jpg",
	},
	{
		id: 15,
		uri: "https://i.pinimg.com/736x/9d/2d/94/9d2d94e023b9021d8f0a39b5d98f71cf.jpg",
	},
	{
		id: 16,
		uri: "https://i.pinimg.com/736x/4b/17/9e/4b179e31d2a98d5f69045ce6f941642f.jpg",
	},
	{
		id: 17,
		uri: "https://i.pinimg.com/736x/ad/6c/34/ad6c34d99197000f57891ef033cf3bbf.jpg",
	},
	{
		id: 18,
		uri: "https://i.pinimg.com/736x/85/c6/e0/85c6e08b42d8567b5065ec37e6c315f4.jpg",
	},
	{
		id: 19,
		uri: "https://i.pinimg.com/736x/ae/48/30/ae4830da32a040561c632d204b6998d6.jpg",
	},
	{
		id: 20,
		uri: "https://i.pinimg.com/736x/9d/2d/94/9d2d94e023b9021d8f0a39b5d98f71cf.jpg",
	},
];

const PADDING = 8;
const GAP = 8;
const COL_NUMBER = 3;
const ITEM1_WIDTH = (width - PADDING * 2 - GAP * (COL_NUMBER - 1)) / 3;
const ITEM2_WIDTH = ((width - PADDING * 2 - GAP * (COL_NUMBER - 2)) / 3) * 2;

const AlbumImageListScreen = () => {
	const insets = useSafeAreaInsets();

	return (
		<>
			<StatusBar barStyle={"dark-content"} />
			<View
				style={{
					flex: 1,
				}}
			>
				<Header
					canGoBack
					intensity={100}
					leftTitle="Main Album"
					leftTitleStyle={{ color: "black" }}
					backIconColor="black"
				></Header>
				<ScrollView
					style={{
						paddingTop:
							insets.top +
							DIMENTIONS.CANGOBACK_HEADER_HEIGHT +
							10,
						paddingHorizontal: PADDING - 0.001,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							gap: GAP,
							flexWrap: "wrap",
						}}
					>
						{images.map((item, index) => (
							<CustomTouchableOpacity
								key={item.id}
								style={{
									width:
										index % 4 == 0 && index !== 0
											? index % 3 !== 0
												? ITEM2_WIDTH
												: ITEM1_WIDTH
											: ITEM1_WIDTH,
									height: ITEM1_WIDTH,
									borderRadius: 10,
									overflow: "hidden",
								}}
							>
								<Image
									source={{ uri: item.uri }}
									style={{
										flex: 1,
									}}
								></Image>
							</CustomTouchableOpacity>
						))}
					</View>

					{/* spacing  */}
					<View style={{ height: 200 }} />
				</ScrollView>
			</View>
		</>
	);
};

export default AlbumImageListScreen;
