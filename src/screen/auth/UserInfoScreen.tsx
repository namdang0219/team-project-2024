import {
	View,
	SafeAreaView,
	TouchableWithoutFeedback,
	Text,
	useWindowDimensions,
	StyleSheet,
	Image,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "components/themed";
import { TitleAuth } from "components/title";
import { DIMENTIONS } from "constant/dimention";
import HeaderWithBack from "module/auth/HeaderWithBack";
import handlePressBackground from "util/func/handlePressBackground";
import { Button } from "components/button";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { CustomTouchableOpacity } from "components/custom";
import { Label } from "components/label";
import { ActionSheet, DateTimePicker } from "react-native-ui-lib";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AvatarDefault, IconArrowDown } from "icon/auth";
import * as ImagePicker from "expo-image-picker";
import { GLOBAL_GRADIENT } from "util/theme/themeColors";
import { AntDesign } from "@expo/vector-icons";

const UserInfoScreen = () => {
	const { navigate } = useNavigation<any>();
	const { colors } = useTheme();
	const [showSexSheet, setShowSexSheet] = useState<boolean>(false);
	const [sex, setSex] = useState<"male" | "female">("male");
	const [showNationalitySheet, setShowNationalitySheet] =
		useState<boolean>(false);
	const [nationality, setNationality] = useState<
		"japan" | "vietnam" | "thai"
	>("japan");
	const { bottom } = useSafeAreaInsets();
	const { width } = useWindowDimensions();
	const [image, setImage] = useState<string | null>(null);

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
					<HeaderWithBack />
					<View
						style={{
							marginHorizontal: DIMENTIONS.AUTH_PADDING,
						}}
					>
						{/* title  */}
						<TitleAuth
							style={{ textAlign: "center", marginTop: 0 }}
						>
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
								<ThemedView style={styles.avatarContainerWhite}>
									{image ? (
										<Image
											source={{ uri: image }}
											style={{ width: 146, height: 146, borderRadius: 1000 }}
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
									<CustomTouchableOpacity onPress={pickImage}>
										<AntDesign
											name="plus"
											size={25}
											color={"white"}
										/>
									</CustomTouchableOpacity>
								</LinearGradient>
							</View>
						</View>

						{/* input  */}
						<View style={{ marginTop: 8, gap: 16 }}>
							{/* sex  */}
							<View>
								<Label>性別</Label>
								<CustomTouchableOpacity
									onPress={() => setShowSexSheet(true)}
									style={styles.inputContainer}
								>
									<Text style={{ color: colors.subGray }}>
										{sex == "male" ? "男性" : "女性"}
									</Text>
									<IconArrowDown color={colors.subGray} />
								</CustomTouchableOpacity>
								<ActionSheet
									title={"あなたの性別を選択してください"}
									visible={showSexSheet}
									onDismiss={() => setShowSexSheet(false)}
									cancelButtonIndex={3}
									destructiveButtonIndex={0}
									options={[
										{
											label: "男性",
											onPress: () => setSex("male"),
										},
										{
											label: "女性",
											onPress: () => setSex("female"),
										},
										{
											label: "キャンセル",
											onPress: () =>
												setShowSexSheet(false),
										},
									]}
									containerStyle={{ paddingBottom: bottom }}
								/>
							</View>

							{/* birthday  */}
							<View>
								<Label>生年月日</Label>
								<CustomTouchableOpacity
									// onPress={() => setShowSexSheet(true)}
									style={styles.inputContainer}
								>
									<DateTimePicker
										editable={true}
										placeholder={"YYYY/MM/DD"}
										style={{ color: colors.subGray }}
										containerStyle={{
											width:
												width -
												2 * 16 -
												2 * DIMENTIONS.AUTH_PADDING,
										}}
									/>
								</CustomTouchableOpacity>
							</View>

							{/* nationality  */}
							<View>
								<Label>国籍</Label>
								<CustomTouchableOpacity
									onPress={() =>
										setShowNationalitySheet(true)
									}
									style={styles.inputContainer}
								>
									<Text style={{ color: colors.subGray }}>
										{nationality == "japan"
											? "日本"
											: nationality == "vietnam"
											? "ベトナム"
											: "タイ"}
									</Text>
									<IconArrowDown color={colors.subGray} />
								</CustomTouchableOpacity>
								<ActionSheet
									title={"あなたの国籍を選択してください"}
									visible={showNationalitySheet}
									onDismiss={() =>
										setShowNationalitySheet(false)
									}
									cancelButtonIndex={4}
									destructiveButtonIndex={0}
									options={[
										{
											label: "日本",
											onPress: () =>
												setNationality("japan"),
										},
										{
											label: "ベトナム",
											onPress: () =>
												setNationality("vietnam"),
										},
										{
											label: "タイ",
											onPress: () =>
												setNationality("thai"),
										},
										{
											label: "キャンセル",
											onPress: () =>
												setShowSexSheet(false),
										},
									]}
									containerStyle={{ paddingBottom: bottom }}
								/>
							</View>
						</View>

						{/* button  */}
						<Button
							style={{ marginTop: 32 }}
							// onPress={handleSubmit(handleFindAccount)}
							onPress={() =>
								navigate("AppStack", { screen: "AlbumStack" })
							}
						>
							次へ
						</Button>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default UserInfoScreen;
