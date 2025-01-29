import {
	View,
	Text,
	Image,
	ScrollView,
	ImageBackground,
	Alert,
	TouchableWithoutFeedback,
	Dimensions,
	StyleSheet,
	Modal,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { DIMENTIONS } from "constant/dimention";
import { Feather, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomTouchableOpacity } from "components/custom";
import { Input } from "components/input";
import { Label } from "components/label";
import handlePressBackground from "util/func/handlePressBackground";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { IUser } from "types/IUser";
import { userMocks } from "mock/userMocks";
import { useItemWidth } from "hook/useItemWidth";
import { useToggle } from "hook/useToggle";
import AlbumTagFriendModal from "./AlbumTagFriendModal";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { IAlbum } from "types/IAlbum";
import { useAuth } from "context/auth-context";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../../../../firebaseConfig";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { Toast } from "toastify-react-native";

const { width } = Dimensions.get("screen");

interface ICreateAlbum {
	title: string;
	description: string;
}

const createAlbumScheme = Yup.object().shape({
	title: Yup.string().required("タイトルを入力してください"),
	description: Yup.string().required("説明を入力してください"),
});

const AlbumCreateModal = ({
	toggleCreateAlbumModal,
	cancelale = true,
}: {
	toggleCreateAlbumModal: () => void;
	cancelale?: boolean;
}) => {
	const insets = useSafeAreaInsets();
	const [loading, setLoading] = useState<boolean>(false);
	const [taggedFriendId, setTaggedFriendId] = useState<IUser["uid"][]>([]);
	const itemWidth = useItemWidth(10, 5);
	const [tagFriendModal, toggleTagFriendModal] = useToggle(false);
	const { colors } = useTheme();
	const { currentUser } = useAuth();
	const {
		handleSubmit,
		control,
		formState: { isValid, errors },
	} = useForm<ICreateAlbum>({
		defaultValues: {
			title: "",
			description: "",
		},
		resolver: yupResolver(createAlbumScheme),
	});

	// data field
	const [image, setImage] = useState<string | undefined>("");

	const taggedFriend: IUser[] = userMocks.filter((u: IUser) =>
		taggedFriendId.includes(u.uid)
	);

	const getBlobFroUri = async (uri: string) => {
		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				reject(new TypeError("Network request failed"));
			};
			xhr.responseType = "blob";
			xhr.open("GET", uri, true);
			xhr.send(null);
		});

		return blob;
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			// allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const onCancle = () => {
		Alert.alert("破壊？", "全ての内容が削除されます", [
			{
				text: "キャンセル",
				style: "cancel",
			},
			{
				text: "破壊",
				onPress: () => toggleCreateAlbumModal(),
				style: "destructive",
			},
		]);
	};

	const handleCreateAlbum = (value: ICreateAlbum) => {
		if (!isValid) {
			return;
		}
		Alert.alert("アルバムを作成しますか？", "", [
			{
				text: "キャンセル",
				style: "cancel",
			},
			{
				text: "はい",
				onPress: () => createAlbum(value),
			},
		]);
	};

	const createAlbum = async (value: ICreateAlbum) => {
		if (!image) {
			Alert.alert("画像を選択してください");
			return;
		}
		try {
			setLoading(true);
			const timestamp = Date.now();

			const imageRef = ref(storage, `0_images/${timestamp}.jpg`);
			const imageBlob = await getBlobFroUri(image);
			await uploadBytes(imageRef, imageBlob as Blob);
			const downloadUrl = await getDownloadURL(imageRef);
			const newAlbum: IAlbum = {
				aid: String(timestamp),
				author: currentUser?.uid as string,
				cover: downloadUrl,
				title: value.title,
				desc: value.description,
				favorite: false,
				taggedFriends: [],
				images: [],
				create_at: timestamp,
				update_at: timestamp,
			};
			await setDoc(doc(db, "0_albums", String(timestamp)), newAlbum);
			await updateDoc(doc(db, "0_users", String(currentUser?.uid)), {
				albums: arrayUnion(newAlbum.aid),
			});
			Toast.success('アルバム作成成功')
			toggleCreateAlbumModal()
		} catch (error) {
			console.log(error);
			Toast.error('作成失敗')
		} finally {
			setLoading(false);
		}
	};

	const styles = StyleSheet.create({
		container: {
			paddingTop: insets.top,
			flex: 1,
		},
		headerContainer: {
			height: DIMENTIONS.HEADER_HEIGHT,
			paddingHorizontal: DIMENTIONS.APP_PADDING,
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "space-between",
		},
		headerTitle: {
			fontSize: 20,
			fontWeight: "500",
			width: width / 2,
			textAlign: "center",
			flex: 1,
		},
		image: {
			height: 560,
			marginTop: 5,
			position: "relative",
		},
		pickerIconContainer: {
			position: "absolute",
			bottom: 20,
			right: 20,
		},
		pickerIcon: {
			shadowOpacity: 0.3,
			shadowRadius: 8,
			elevation: 8,
		},
		contentContainer: {
			paddingHorizontal: DIMENTIONS.APP_PADDING,
			marginTop: 20,
			flex: 1,
			gap: 22,
		},
		addFriendItemContainer: {
			width: itemWidth,
			height: itemWidth,
			borderRadius: 1000,
			backgroundColor: "#f3f4f6",
			alignItems: "center",
			justifyContent: "center",
		},
	});

	const FriendItem = ({ user }: { user: IUser }) => {
		const handleUntagFriend = () => {
			const index = taggedFriendId.indexOf(user.uid);
			if (index >= 0) {
				setTaggedFriendId(
					taggedFriendId.filter((id) => id !== user.uid)
				);
			}
		};

		return (
			<View style={{ position: "relative" }}>
				<Image
					source={{
						uri: user.photoURL,
					}}
					style={{
						width: itemWidth,
						height: itemWidth,
						aspectRatio: "1/1",
						borderRadius: 1000,
					}}
				/>
				<CustomTouchableOpacity
					onPress={handleUntagFriend}
					style={{
						position: "absolute",
						top: -2,
						right: -2,
						backgroundColor: "white",
						width: 20,
						aspectRatio: 1,
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 100,
						shadowOpacity: 0.08,
					}}
				>
					<Feather name="x" />
				</CustomTouchableOpacity>
			</View>
		);
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			{/* header  */}
			<View style={styles.headerContainer}>
				<View style={{ width: 30 }}>
					{cancelale && (
						<CustomTouchableOpacity
							onPress={onCancle}
							style={{ width: 30 }}
						>
							<Feather name="x" size={26} color={"red"} />
						</CustomTouchableOpacity>
					)}
				</View>

				<Text style={styles.headerTitle}>アルバム作成</Text>

				<CustomTouchableOpacity
					onPress={handleSubmit(handleCreateAlbum)}
					style={{ width: 30 }}
				>
					{loading ? (
						<ActivityIndicator size={"small"} />
					) : (
						<Feather name="check" size={26} color={"#00C261"} />
					)}
				</CustomTouchableOpacity>
			</View>

			{/* content  */}
			<TouchableWithoutFeedback onPress={handlePressBackground}>
				<ScrollView style={{ flex: 1 }}>
					{image ? (
						<ImageBackground
							source={{
								uri: image,
							}}
							style={styles.image}
						>
							<CustomTouchableOpacity
								style={styles.pickerIconContainer}
								onPress={pickImage}
							>
								<Feather
									name="edit"
									size={30}
									color={"white"}
									style={styles.pickerIcon}
								/>
							</CustomTouchableOpacity>
						</ImageBackground>
					) : (
						<CustomTouchableOpacity
							onPress={pickImage}
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: colors.input,
								height: 560,
							}}
						>
							<MaterialCommunityIcons
								name="file-image-plus-outline"
								size={60}
								color={colors.icon}
							/>
							<Text
								style={{
									color: colors.icon,
									marginTop: 14,
									fontWeight: "500",
								}}
							>
								写真をアップロード
							</Text>
						</CustomTouchableOpacity>
					)}
					{/* input  */}
					<View style={styles.contentContainer}>
						<View>
							<Label>タイトル</Label>
							<Controller
								control={control}
								render={({
									field: { onChange, onBlur, value },
								}) => (
									<Input
										placeholder="アルバムのタイトル"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										errorMessage={errors.title?.message}
									/>
								)}
								name="title"
							/>
						</View>
						<View>
							<Label>説明</Label>
							<Controller
								control={control}
								render={({
									field: { onChange, onBlur, value },
								}) => (
									<Input
										placeholder="アルバムの説明"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										errorMessage={
											errors.description?.message
										}
									/>
								)}
								name="description"
							/>
						</View>
						<View>
							<Label>友達</Label>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									gap: 10,
								}}
							>
								{taggedFriend.map((item: IUser) => (
									<FriendItem key={item.uid} user={item} />
								))}
								<CustomTouchableOpacity
									style={styles.addFriendItemContainer}
									onPress={toggleTagFriendModal}
								>
									<AntDesign
										name="plus"
										color={"#9ca3af"}
										size={30}
									/>
								</CustomTouchableOpacity>
							</View>
						</View>
					</View>

					<View style={{ height: 500 }}></View>
				</ScrollView>
			</TouchableWithoutFeedback>

			<Modal
				visible={tagFriendModal}
				animationType="slide"
				presentationStyle="formSheet"
			>
				<AlbumTagFriendModal
					toggleTagFriendModal={toggleTagFriendModal}
					taggedFriendId={taggedFriendId}
					setTaggedFriendId={setTaggedFriendId}
				/>
			</Modal>
		</KeyboardAvoidingView>
	);
};

export default AlbumCreateModal;
