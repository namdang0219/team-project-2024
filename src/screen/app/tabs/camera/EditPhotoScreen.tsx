import { View } from "react-native";
import React from "react";
import { Button } from "components/button";
import { useNavigation } from "@react-navigation/native";

const EditPhotoScreen = () => {
	const { navigate } = useNavigation<any>();

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Button
				style={{ width: "50%" }}
				onPress={() =>
					navigate("GlobalStack", { screen: "CameraScreen" })
				}
			>
				Open Camera
			</Button>
		</View>
	);
};

export default EditPhotoScreen;
