import { View } from "react-native";
import React from "react";
import { ThemedText } from "components/themed";
import { useAuth } from "context/auth-context";

const BaseInfo = () => {
	const { remoteUserData } = useAuth();

	return (
		<View
			style={{
				marginHorizontal: "auto",
				alignItems: "center",
				gap: 4,
			}}
		>
			{remoteUserData?.displayName && (
				<ThemedText
					style={{
						fontSize: 20,
						fontWeight: "600",
						marginTop: 6,
					}}
				>
					{remoteUserData?.displayName}
				</ThemedText>
			)}
			{remoteUserData?.email && (
				<ThemedText style={{ opacity: 0.4 }}>
					{remoteUserData?.email}
				</ThemedText>
			)}
		</View>
	);
};

export default BaseInfo;
