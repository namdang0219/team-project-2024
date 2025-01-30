import {
	View,
	SafeAreaView,
	TouchableWithoutFeedback,
	Text,
	useWindowDimensions,
	StyleSheet,
	Image,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "components/themed";
import { TitleAuth } from "components/title";
import { DIMENTIONS } from "constant/dimention";
import handlePressBackground from "util/func/handlePressBackground";
import { Button } from "components/button";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { CustomTouchableOpacity } from "components/custom";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AvatarDefault } from "icon/auth";
import * as ImagePicker from "expo-image-picker";
import { GLOBAL_GRADIENT } from "util/theme/themeColors";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "context/auth-context";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getBlobFromUri } from "util/func/getBlobFromUri";
import { auth, db, storage } from "../../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const UserInfoScreen = () => {
	const { navigate } = useNavigation<any>();
	const { colors } = useTheme();
	const [image, setImage] = useState<string | null>(null);
	const { currentUser } = useAuth();
	const [loading, setLoading] = useState<boolean>(false);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const updateUserProfile = async () => {
		if (!image) {
			Alert.alert("写真を選択してください");
			return;
		}
		try {
			setLoading(true);
			const timestamp = Date.now();
			const fileName = `${timestamp}.jpg`;
			const avatarRef = ref(storage, `0_avatars/${fileName}`);
			const imageBlob = await getBlobFromUri(image);
			await uploadBytes(avatarRef, imageBlob as Blob);
			const downloadUrl = await getDownloadURL(avatarRef);
			if (auth.currentUser) {
				await updateProfile(auth.currentUser, {
					photoURL: downloadUrl,
				});
				const userDoc = doc(db, "0_users", auth.currentUser.uid);
				await updateDoc(userDoc, {
					photoURL: downloadUrl,
				});
				navigate("GlobalStack", {
					screen: "RequirePermisionsScreen",
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const styles = StyleSheet.create({
		avatarContainerGradient: {
			width: 160,
			height: 160,
			borderRadius: 1000,
			alignItems: "center",
			justifyContent: "center",
			marginHorizontal: "auto",
			marginTop: 30,
		},
		avatarContainerWhite: {
			width: 152,
			height: 152,
			borderRadius: 1000,
			alignItems: "center",
			justifyContent: "center",
		},
		inputContainer: {
			height: 50,
			borderRadius: DIMENTIONS.AUTH_INPUT_BORDER_RADIUS,
			borderColor: colors.primary,
			borderWidth: 1,
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: 16,
			justifyContent: "space-between",
		},
	});

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={handlePressBackground}>
				<View style={{ flex: 1 }}>
					<View
						style={{
							marginHorizontal: DIMENTIONS.AUTH_PADDING,
							flex: 1,
						}}
					>
						<View style={{ flex: 1 }}>
							{/* title  */}
							<TitleAuth style={{ textAlign: "center" }}>
								基本情報
							</TitleAuth>

							{/* avatar  */}
							<View
								style={{
									position: "relative",
									marginHorizontal: "auto",
								}}
							>
								<LinearGradient
									colors={["#D823FF", "#9A33EF"]}
									style={styles.avatarContainerGradient}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 1 }}
								>
									<ThemedView
										style={styles.avatarContainerWhite}
									>
										{image ? (
											<Image
												source={{ uri: image }}
												style={{
													width: 146,
													height: 146,
													borderRadius: 1000,
												}}
											/>
										) : (
											<AvatarDefault></AvatarDefault>
										)}
									</ThemedView>
								</LinearGradient>
								<View
									style={{
										width: 35,
										height: 35,
										position: "absolute",
										bottom: 0,
										right: 10,
										backgroundColor: "white",
										borderRadius: 1000,
										zIndex: 50,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<LinearGradient
										colors={[
											GLOBAL_GRADIENT.STOP_1,
											GLOBAL_GRADIENT.STOP_2,
										]}
										style={{
											borderRadius: 1000,
											width: 30,
											height: 30,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<CustomTouchableOpacity
											onPress={pickImage}
										>
											<AntDesign
												name="plus"
												size={25}
												color={"white"}
											/>
										</CustomTouchableOpacity>
									</LinearGradient>
								</View>
							</View>

							<Text
								style={{
									fontSize: 24,
									textAlign: "center",
									fontWeight: "500",
									marginTop: 20,
								}}
							>
								{currentUser?.displayName}
							</Text>
						</View>

						{/* button  */}
						<Button onPress={updateUserProfile} loading={loading}>
							次へ
						</Button>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default UserInfoScreen;
