import { View } from "react-native";
import React from "react";
import { CustomTouchableOpacity } from "components/custom";
import { IconArrowLeft } from "icon/auth";
import { useNavigation } from "@react-navigation/native";

const HeaderWithBack = () => {
	const { goBack } = useNavigation<any>();

	return (
		<View
			style={{
				marginHorizontal: 20,
				marginTop: 10,
				marginBottom: 30,
			}}
		>
			<CustomTouchableOpacity
				style={{ marginRight: "auto" }}
				onPress={() => goBack()}
			>
				<IconArrowLeft />
			</CustomTouchableOpacity>
		</View>
	);
};

export default HeaderWithBack;
