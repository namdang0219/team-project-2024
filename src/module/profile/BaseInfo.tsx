import { View, Text } from "react-native";
import React from "react";
import { ThemedText } from "components/themed";
import { IUser } from "types/IUser";

const BaseInfo = ({
	displayName = "user",
	email = "user@example.com",
}: {
	displayName: IUser["displayName"] | null | undefined;
	email?: IUser["email"] | null;
}) => {
	return (
		<View
			style={{
				marginHorizontal: "auto",
				alignItems: "center",
				gap: 4,
			}}
		>
			{displayName && (
				<ThemedText
					style={{
						fontSize: 20,
						fontWeight: "600",
						marginTop: 6,
					}}
				>
					{displayName}
				</ThemedText>
			)}
			{email && <ThemedText style={{ opacity: 0.4 }}>{email}</ThemedText>}
		</View>
	);
};

export default BaseInfo;
