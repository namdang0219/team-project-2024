import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { CustomTouchableOpacity } from "components/custom";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { captureRef } from "react-native-view-shot";

type CameraTopbarProps = {
	previewPhotoUri: string | null;
	photoUri: string | null;
	setPreviewPhotoUri: React.Dispatch<React.SetStateAction<string | null>>;
	setPhotoUri: React.Dispatch<React.SetStateAction<string | null>>;
	viewRef: React.RefObject<View>;
};

const CameraTopbar = ({
	previewPhotoUri,
	photoUri,
	viewRef,
	setPreviewPhotoUri,
	setPhotoUri,
}: CameraTopbarProps) => {
	const { goBack, navigate } = useNavigation<any>();

	const handleBackButton = () => {
		if (previewPhotoUri || photoUri) {
			setPreviewPhotoUri(null);
			setPhotoUri(null);
		} else {
			goBack();
		}
	};

	const handleNavigateToSave = async () => {
		try {
			const capturedUri = await captureRef(viewRef, {
				format: "jpg",
				quality: 0.8,
			});
			setPhotoUri(capturedUri);
			navigate("SavePhotoScreen", { capturedUri });
		} catch (error) {
			console.error("Something went wrong!", error);
		}
	};

	return (
		<View
			style={{
				height: 50,
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				paddingHorizontal: 10,
			}}
		>
			{/* x mark  */}
			<CustomTouchableOpacity onPress={handleBackButton}>
				<Feather
					name="x"
					size={30}
					color={"white"}
					style={styles.primaryShadow}
				/>
			</CustomTouchableOpacity>
			{/* image flip  */}
			{previewPhotoUri && (
				<CustomTouchableOpacity>
					<MaterialCommunityIcons
						name="flip-horizontal"
						size={26}
						color={"white"}
						style={styles.primaryShadow}
					/>
				</CustomTouchableOpacity>
			)}
			{/* save button  */}
			{previewPhotoUri && (
				<CustomTouchableOpacity onPress={handleNavigateToSave}>
					<Text
						style={[
							{
								color: "white",
								fontSize: 18,
							},
							styles.primaryShadow,
						]}
					>
						保存
					</Text>
				</CustomTouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	primaryShadow: {
		shadowRadius: 8,
		shadowOpacity: 0.6,
	},
});

export default CameraTopbar;