import { View, Text, useWindowDimensions } from "react-native";
import React, { Dispatch, FC, SetStateAction } from "react";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { AntDesign } from "@expo/vector-icons";
import { CUSTOM_STYLES } from "style/customStyle";
import { useNavigation } from "@react-navigation/native";
import { captureRef } from "react-native-view-shot";

type CameraViewTopBarProps = {
	previewPhotoUri: string | null;
	setIsCameraVisible: Dispatch<SetStateAction<boolean>>;
	setPreviewPhotoUri: Dispatch<SetStateAction<string>>;
};

const CameraViewTopBar: FC<CameraViewTopBarProps> = ({
	previewPhotoUri,
	setIsCameraVisible,
	setPreviewPhotoUri,
}) => {
	const { width } = useWindowDimensions();
	const { goBack, navigate } = useNavigation<any>();

	const handleGoBack = () => {
		if (!previewPhotoUri) {
			setIsCameraVisible(false);
			goBack();
		} else if (previewPhotoUri) {
			setPreviewPhotoUri("");
			setIsCameraVisible(true);
		}
	};

	const handleSaveImage = async () => {
		try {
			// const capturedUri = await captureRef(viewRef, {
			// 	format: "jpg",
			// 	quality: 0.8,
			// });
			const capturedUri = previewPhotoUri;
			navigate("SavePhotoScreen", { capturedUri });
		} catch (error) {
			console.error("Something went wrong!", error);
		}
	};

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				height: DIMENTIONS.HEADER_HEIGHT,
				paddingHorizontal: DIMENTIONS.APP_PADDING,
				position: "absolute",
				width,
				top: 0,
				left: 0,
				zIndex: 100,
			}}
		>
			<CustomTouchableOpacity
				onPress={handleGoBack}
				style={{ width: 50 }}
			>
				<AntDesign
					name="close"
					color="white"
					size={24}
					style={CUSTOM_STYLES.shadow}
				/>
			</CustomTouchableOpacity>

			{previewPhotoUri && (
				<CustomTouchableOpacity
					onPress={handleSaveImage}
					style={{ width: 50 }}
				>
					<Text
						style={[
							CUSTOM_STYLES.shadow,
							{
								marginLeft: "auto",
								fontSize: 20,
								color: "white",
							},
						]}
					>
						保存
					</Text>
				</CustomTouchableOpacity>
			)}
		</View>
	);
};

export default CameraViewTopBar;
