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

const width = Dimensions.get("screen").width;

const Category = () => {
	return (
		<View style={{ paddingHorizontal: DIMENTIONS.APP_PADDING }}>
			<Text
				style={{
					fontSize: 18,
					fontWeight: "600",
					textAlign: "center",
				}}
			>
				カテゴリー
			</Text>
			<View
				style={{
					flexDirection: "row",
					flexWrap: "wrap",
					gap: 12,
					marginTop: 12,
				}}
			>
				{Array(4)
					.fill(null)
					.map((item, index) => (
						<CustomTouchableOpacity key={index}>
							<ImageBackground
								source={{
									uri: "https://i.pinimg.com/736x/3b/12/87/3b12878320d3ee5120d8a405afa4b5b8.jpg",
								}}
								style={{
									width:
										(width -
											DIMENTIONS.APP_PADDING * 2 -
											12) /
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
										#芸術
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
