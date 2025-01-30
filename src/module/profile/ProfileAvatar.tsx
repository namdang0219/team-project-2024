import { View, Image, StyleSheet, ViewProps } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedView } from "components/themed";
import { IUser } from "types/IUser";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "context/auth-context";

const ProfileAvatar = ({ style = {}, ...props }: ViewProps) => {
	const { colors } = useTheme();
	const { remoteUserData } = useAuth();

	return (
		<View
			style={[
				{
					position: "relative",
					marginHorizontal: "auto",
				},
				style,
			]}
			{...props}
		>
			<LinearGradient
				colors={["#D823FF", "#9A33EF"]}
				style={styles.avatarContainerGradient}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<ThemedView style={styles.avatarContainerWhite}>
					{remoteUserData?.photoURL ? (
						<Image
							source={{
								uri: remoteUserData.photoURL,
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
								flex: 1,
								backgroundColor: colors.input,
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 1000,
								width: 146, 
								height: 146
							}}
						>
							<Feather
								name="user"
								size={40}
								color={colors.icon}

							/>
						</View>
					)}
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
