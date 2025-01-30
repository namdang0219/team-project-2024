import { View, TouchableOpacity, StyleSheet, Share } from "react-native";
import React from "react";
import ProfileAvatar from "./ProfileAvatar";
import BaseInfo from "./BaseInfo";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ThemedText } from "components/themed";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "context/auth-context";

const ProfileHeader = () => {
	const { colors } = useTheme();
	const { navigate } = useNavigation<any>();
	const { remoteUserData } = useAuth();

	const styles = StyleSheet.create({
		analyticContainer: {
			flexDirection: "row",
			gap: 60,
			justifyContent: "center",
			marginTop: 15,
		},
		featureContainer: {
			flexDirection: "row",
			alignItems: "center",
			gap: 10,
			justifyContent: "center",
			marginTop: 10,
			marginBottom: 5,
		},
		featureItem: {
			flexDirection: "row",
			alignItems: "center",
			gap: 4,
			borderWidth: 1,
			borderColor: colors.text,
			height: 30,
			paddingHorizontal: 16,
			borderRadius: 6,
			opacity: 0.5,
		},
	});

	return (
		<>
			<ProfileAvatar />

			{/* base info  */}
			<BaseInfo />

			{/* post and friends number  */}
			<View style={styles.analyticContainer}>
				<View style={{ alignItems: "center", gap: 2 }}>
					<ThemedText style={{ opacity: 0.4 }}>投稿</ThemedText>
					<ThemedText style={{ fontWeight: "600", fontSize: 20 }}>
						{/* {posts} */}
					</ThemedText>
				</View>
				<View style={{ alignItems: "center", gap: 2 }}>
					<ThemedText style={{ opacity: 0.4 }}>友達</ThemedText>
					<ThemedText style={{ fontWeight: "600", fontSize: 20 }}>
						{/* {friends} */}
					</ThemedText>
				</View>
			</View>

			{/* profile feature button  */}
			<View style={styles.featureContainer}>
				<TouchableOpacity
					style={styles.featureItem}
					onPress={() => navigate("EditProfileScreen")}
				>
					<Feather name="edit" size={16} />
					<ThemedText>情報を編集</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.featureItem}
					onPress={() => {
						Share.share({
							message: "プロフィールをシェア",
							title: remoteUserData?.displayName as string,
							url: remoteUserData?.photoURL as string,
						});
					}}
				>
					<Feather name="share-2" size={16} />
					<ThemedText>シェア</ThemedText>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default ProfileHeader;
