import { View, Image, StyleSheet, ViewProps } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedView } from "components/themed";
import { IUser } from "types/IUser";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";

const ProfileAvatar = () => {
	const {} = useSelector((state: RootState) => state.user)

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
					{/* <Image
						source={{
							uri: photoURL,
						}}
						style={{
							width: 146,
							height: 146,
							borderRadius: 1000,
						}}
					/> */}
				</ThemedView>
			</LinearGradient>
		</View>
	);
};

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
});

export default ProfileAvatar;
