import { View, Image, StyleSheet, ViewProps, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedView } from "components/themed";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { UserDataType } from "types/UserDataType";
import { useTheme } from "@react-navigation/native";

const ProfileAvatar = () => {
	const { colors } = useTheme();
	const { photoURL, displayName } = useSelector(
		(state: RootState) => state.user as UserDataType
	);

	const styles = StyleSheet.create({
		avatarContainerGradient: {
			width: 160,
			height: 160,
			borderRadius: 1000,
			alignItems: "center",
			justifyContent: "center",
			marginHorizontal: "auto",
		},
		avatarContainerWhite: {
			width: 152,
			height: 152,
			borderRadius: 1000,
			alignItems: "center",
			justifyContent: "center",
		},
		text: {
			fontSize: 60,
			color: colors.icon,
			textTransform: "uppercase",
		},
	});

	return (
		<View
			style={[
				{
					position: "relative",
					marginHorizontal: "auto",
				},
			]}
		>
			<LinearGradient
				colors={["#D823FF", "#9A33EF"]}
				style={styles.avatarContainerGradient}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<ThemedView style={styles.avatarContainerWhite}>
					{photoURL ? (
						<Image
							source={{
								uri: photoURL,
							}}
							style={{
								width: 146,
								height: 146,
								borderRadius: 1000,
							}}
						/>
					) : (
						<View
							style={{
								width: 146,
								height: 146,
								borderRadius: 1000,
								backgroundColor: colors.input,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Text style={styles.text}>
								{displayName.slice(0, 1)}
							</Text>
						</View>
					)}
				</ThemedView>
			</LinearGradient>
		</View>
	);
};

export default ProfileAvatar;
