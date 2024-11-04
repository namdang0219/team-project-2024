import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button } from "components/button";
import { useToast } from "react-native-toast-notifications";

const NotificationScreen = () => {
	const toast = useToast();
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Button
				onPress={() => {
					toast.show("success", { type: "custom_type" });
				}}
				style={{ paddingHorizontal: 20 }}
			>
				Show Toast
			</Button>
		</View>
	);
};

export default NotificationScreen;
