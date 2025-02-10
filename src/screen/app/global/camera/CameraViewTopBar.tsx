import { View, Text, useWindowDimensions } from "react-native";
import React, { Dispatch, FC, SetStateAction } from "react";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { AntDesign } from "@expo/vector-icons";
import { CUSTOM_STYLES } from "style/customStyle";
import { useNavigation } from "@react-navigation/native";
import { captureRef } from "react-native-view-shot";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/configureStore";
import * as FileSystem from "expo-file-system";
import { ImageType } from "types/ImageType";
import { updateAlbum } from "store/album/albumSlice";
import { AlbumType } from "types/AlbumType";

type CameraViewTopBarProps = {
	previewPhotoUri: string | null;
	setIsCameraVisible: Dispatch<SetStateAction<boolean>>;
	setPreviewPhotoUri: Dispatch<SetStateAction<string>>;
	viewRef: React.RefObject<View>;
	customAction?: boolean;
	aid?: string;
	imageData?: ImageType;
};

const CameraViewTopBar: FC<CameraViewTopBarProps> = ({
	previewPhotoUri,
	setIsCameraVisible,
	setPreviewPhotoUri,
	viewRef,
	customAction,
	aid,
	imageData,
}) => {
	const { width } = useWindowDimensions();
	const { goBack, navigate } = useNavigation<any>();

	const albums = useSelector(
		(state: RootState) => state.albums as AlbumType[]
	);
	const filteredAlbum = albums.find((a) => a.aid === aid);

	const handleGoBack = () => {
		if (!customAction) {
			if (!previewPhotoUri) {
				setIsCameraVisible(false);
				goBack();
			} else if (previewPhotoUri) {
				setPreviewPhotoUri("");
				setIsCameraVisible(true);
			}
		} else if (customAction) {
			goBack();
		}
	};

	const dispatch = useDispatch<AppDispatch>();
	const handleUpdateNewImage = async (capturedImage: string) => {
		try {
			if (!imageData) return;
			if (!capturedImage) return;
			// Đường dẫn của ảnh cũ
			const oldImageUri = imageData.source.uri;

			// Kiểm tra nếu ảnh cũ tồn tại, thì xóa nó
			const fileInfo = await FileSystem.getInfoAsync(oldImageUri);
			if (fileInfo.exists) {
				await FileSystem.deleteAsync(oldImageUri, { idempotent: true });
				console.log("Đã xóa ảnh cũ:", oldImageUri);
			}

			// Tạo đường dẫn mới trong thư mục lưu ảnh
			const newFileName = capturedImage.split("/").pop(); // Lấy tên file từ URL mới
			const newFilePath = `${FileSystem.documentDirectory}${newFileName}`; // Nơi lưu ảnh mới

			// Copy ảnh mới vào thư mục
			await FileSystem.copyAsync({
				from: capturedImage,
				to: newFilePath,
			});

			const newImage: ImageType = {
				...imageData,
				source: {
					fileName: newFileName as string,
					uri: newFilePath,
				},
				update_at: Date.now(),
			};

			if (!filteredAlbum) return;

			dispatch(
				updateAlbum({
					...filteredAlbum,
					images: filteredAlbum.images.map((img) =>
						img.iid === newImage.iid ? newImage : img
					),
					update_at: Date.now(),
				})
			);
			navigate("GlobalStack", {
				screen: "AlbumImageListScreen",
				params: { aid: aid },
			});
		} catch (error) {
			console.error("Lỗi khi cập nhật ảnh:", error);
			return null;
		}
	};

	const handleSaveImage = async () => {
		if (!customAction) {
			try {
				const capturedUri = await captureRef(viewRef, {
					format: "jpg",
					quality: 0.8,
				});
				navigate("SavePhotoScreen", { capturedUri });
			} catch (error) {
				console.error("Something went wrong!", error);
			}
		} else if (customAction) {
			const capturedUri = await captureRef(viewRef, {
				format: "jpg",
				quality: 0.8,
			});
			handleUpdateNewImage(capturedUri);
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
				zIndex: 10000,
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
