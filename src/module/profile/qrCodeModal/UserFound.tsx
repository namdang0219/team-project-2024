import { View, Text, StyleSheet } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { CustomTouchableOpacity } from "components/custom";
import { ThemedText } from "components/themed";
import BaseInfo from "../BaseInfo";
import ProfileAvatar from "../ProfileAvatar";
import { useTheme } from "@react-navigation/native";

const UserFound = ({
	setQrCodeModal,
}: {
	setQrCodeModal: Dispatch<SetStateAction<boolean>>;
}) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
		button: {
			width: 100,
			height: 40,
			borderRadius: 1000,
			justifyContent: "center",
			alignItems: "center",
			borderWidth: 1,
			borderColor: colors.primary,
		},
		analyticContainer: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			gap: 40,
			marginTop: 10,
		},
		analyticItem: {
			alignItems: "center",
			gap: 2,
		},
		analyticNumber: {
			fontWeight: "600",
			fontSize: 20,
		},
		actionContainer: {
			flexDirection: "row",
			alignItems: "center",
			marginTop: 15,
			gap: 10,
		},
	});

	return (
		<View style={styles.container}>
			<ProfileAvatar
				photoURL={
					"https://i.pinimg.com/736x/dd/73/71/dd7371367f0542d7b460686af7804b6d.jpg"
				}
			/>
			<BaseInfo displayName="Dinosure_92" />
			<Text
				style={{
					color: colors.subGray,
					marginTop: 6,
				}}
			>
				2024/11/1から使用開始
			</Text>
			<View style={styles.analyticContainer}>
				<View style={styles.analyticItem}>
					<ThemedText style={{ opacity: 0.4 }}>投稿</ThemedText>
					<ThemedText style={styles.analyticNumber}>20</ThemedText>
				</View>
				<View style={styles.analyticItem}>
					<ThemedText style={{ opacity: 0.4 }}>友達</ThemedText>
					<ThemedText style={styles.analyticNumber}>36</ThemedText>
				</View>
			</View>
			<View style={styles.actionContainer}>
				<CustomTouchableOpacity
					style={styles.button}
					onPress={() => setQrCodeModal(false)}
				>
					<Text
						style={{
							color: colors.primary,
						}}
					>
						キャンセル
					</Text>
				</CustomTouchableOpacity>
				<CustomTouchableOpacity
					style={[
						styles.button,
						{
							backgroundColor: colors.primary,
						},
					]}
				>
					<Text
						style={{
							color: "white",
							fontWeight: "500",
						}}
					>
						見る
					</Text>
				</CustomTouchableOpacity>
			</View>
		</View>
	);
};

export default UserFound;
