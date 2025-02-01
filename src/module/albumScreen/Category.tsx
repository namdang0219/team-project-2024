import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	Dimensions,
} from "react-native";
import React from "react";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { ThemedText } from "components/themed";

const width = Dimensions.get("screen").width;

const categories = [
	{
		title: "家族",
		uri: "https://i.pinimg.com/736x/8e/73/b9/8e73b9c7dc43c2847543acdcadb9662b.jpg",
	},
	{
		title: "子供",
		uri: "https://i.pinimg.com/736x/ab/08/bb/ab08bb0adf4085a315d7982d29bf5ab2.jpg",
	},
	{
		title: "旅行",
		uri: "https://i.pinimg.com/736x/b3/03/3e/b3033ea89755cc2ed2d5862323a41b69.jpg",
	},
	{
		title: "友達",
		uri: "https://i.pinimg.com/736x/51/db/2a/51db2a09a914b315355785812412c2d6.jpg",
	},
];

const Category = () => {
	return (
		<View style={{ paddingHorizontal: DIMENTIONS.APP_PADDING }}>
			<ThemedText
				style={{
					fontSize: 18,
					fontWeight: "600",
					textAlign: "center",
				}}
			>
				カテゴリー
			</ThemedText>
			<View
				style={{
					flexDirection: "row",
					flexWrap: "wrap",
					gap: 12,
					marginTop: 12,
				}}
			>
				{categories.map((item, index) => (
					<CustomTouchableOpacity key={index}>
						<ImageBackground
							source={{
								uri: item.uri,
							}}
							style={{
								width:
									(width - DIMENTIONS.APP_PADDING * 2 - 12) /
									2,
								aspectRatio: "2/0.85",
								borderRadius: 10,
								overflow: "hidden",
								position: "relative",
							}}
						>
							<View
								style={[
									StyleSheet.absoluteFill,
									,
									{
										backgroundColor: "rgba(0,0,0,0.35)",
										alignItems: "center",
										justifyContent: "center",
									},
								]}
							>
								<Text
									style={{
										color: "white",
										fontSize: 20,
										fontWeight: "600",
									}}
								>
									{`#${item.title}`}
								</Text>
							</View>
						</ImageBackground>
					</CustomTouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default Category;
