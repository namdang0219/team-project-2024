import { View, Text } from "react-native";
import React from "react";
import { ThemedText } from "components/themed";
import { IUser } from "types/IUser";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { UserType } from "types/UserType";

const BaseInfo = () => {
	const { displayName, email } = useSelector(
		(state: RootState) => state.user as UserType
	);
	console.log("🚀 ~ BaseInfo ~ email:", email)
	console.log("🚀 ~ BaseInfo ~ displayName:", displayName)
	

	return (
		<View
			style={{
				marginHorizontal: "auto",
				alignItems: "center",
				gap: 4,
			}}
		>
			<ThemedText
				style={{
					fontSize: 20,
					fontWeight: "600",
					marginTop: 6,
				}}
			>
				{displayName}
			</ThemedText>
			{email && <ThemedText style={{ opacity: 0.4 }}>{email}</ThemedText>}
		</View>
	);
};

export default BaseInfo;
