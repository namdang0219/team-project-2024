import { View, StyleSheet } from "react-native";
import React from "react";

const GridSection = () => {
	return (
		<View style={[{ zIndex: 1 }, StyleSheet.absoluteFill]}>
			{/* horizontal  */}
			<View
				style={[styles.line, styles.horizontalLine, { top: "33.33%" }]}
			/>
			<View
				style={[styles.line, styles.horizontalLine, { top: "66.66%" }]}
			/>
			{/* vertical  */}
			<View
				style={[styles.line, styles.verticalLine, { left: "33.33%" }]}
			/>
			<View
				style={[styles.line, styles.verticalLine, { left: "66.66%" }]}
			/>
		</View>
	);
};

export default GridSection;

const styles = StyleSheet.create({
	line: {
		position: "absolute",
		backgroundColor: "rgba(255, 255, 255, 0.25)",
	},
	horizontalLine: {
		width: "100%",
		height: 1,
	},
	verticalLine: {
		height: "100%",
		width: 1,
	},
});
