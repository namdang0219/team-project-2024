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
import { CUSTOM_STYLES } from "style/customStyle";

const width = Dimensions.get("screen").width;

const categories: { category: string; image: string }[] = [
	{
		category: "家族",
		image: "https://i.pinimg.com/736x/2a/e8/4a/2ae84a92b42c5796810ab4d404d62e4a.jpg",
	},
	{
		category: "友達",
		image: "https://i.pinimg.com/736x/2e/b8/5f/2eb85f34d2f4f4e2056f70c420d9fcb1.jpg",
	},
	{
		category: "勉強",
		image: "https://i.pinimg.com/736x/d7/f1/5a/d7f15a31e2e076bc50fcc6e7db787f81.jpg",
	},
	{
		category: "デート",
		image: "https://i.pinimg.com/736x/91/f6/32/91f6329cccb67190003670a104d8a25d.jpg",
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
								uri: item.image,
							}}
							style={{
								width:
									(width - DIMENTIONS.APP_PADDING * 2 - 12) /
									2,
								aspectRatio: "2/1",
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
										backgroundColor: "rgba(0,0,0,0.15)",
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
									{`#${item.category}`}
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
