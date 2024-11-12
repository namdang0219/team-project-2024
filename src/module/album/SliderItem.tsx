import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";

const SliderItem = () => {
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
					uri: "https://i.pinimg.com/564x/93/b0/09/93b0094fba97730b6cd3c79794acfc0c.jpg",
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
						横浜旅行
					</Text>
					<Text style={{ color: "white", fontSize: 16 }}>26枚</Text>
				</View>
			</ImageBackground>
		</View>
	);
};

export default SliderItem;
