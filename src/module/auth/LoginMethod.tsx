import { StyleSheet, View } from "react-native";
import React from "react";
import { ThemedText } from "components/themed";
import { useTheme } from "@react-navigation/native";
import { CustomTouchableOpacity } from "components/custom";
import { IconFacebook, IconGoogle } from "icon/auth";

const LoginMethod = () => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		buttonContainer: {
			alignItems: "center",
			justifyContent: "center",
			borderWidth: 1,
			borderColor: colors.primary,
			height: 40,
			borderRadius: 8,
			position: "relative",
		},
		icon: {
			position: "absolute",
			left: 14,
		},
	});

	return (
		<View style={{ marginBottom: 60, gap: 14 }}>
			{/* google login  */}
			<CustomTouchableOpacity style={styles.buttonContainer}>
				<View style={styles.icon}>
					<IconGoogle></IconGoogle>
				</View>
				<ThemedText>Googleでログイン</ThemedText>
			</CustomTouchableOpacity>

			{/* fb login  */}
			<CustomTouchableOpacity style={styles.buttonContainer}>
				<View style={styles.icon}>
					<IconFacebook></IconFacebook>
				</View>
				<ThemedText>Facebookでログイン</ThemedText>
			</CustomTouchableOpacity>
		</View>
	);
};

export default LoginMethod;
