import {
	View,
	SafeAreaView,
	TouchableWithoutFeedback,
	Text,
	useWindowDimensions,
	StyleSheet,
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
import { LabelInputAuth } from "components/label";
import { ActionSheet, DateTimePicker } from "react-native-ui-lib";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AvatarDefault, IconArrowDown } from "icon/auth";

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
						<LinearGradient
							colors={["#D823FF", "#9A33EF"]}
							style={styles.avatarContainerGradient}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
						>
							<ThemedView style={styles.avatarContainerWhite}>
								<CustomTouchableOpacity>
									<AvatarDefault></AvatarDefault>
								</CustomTouchableOpacity>
							</ThemedView>
						</LinearGradient>

						{/* input  */}
						<View style={{ marginTop: 8, gap: 16 }}>
							{/* sex  */}
							<View>
								<LabelInputAuth>性別</LabelInputAuth>
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
								<LabelInputAuth>生年月日</LabelInputAuth>
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
								<LabelInputAuth>国籍</LabelInputAuth>
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
							onPress={() => navigate('AppStack', {screen: 'AlbumStack'})}
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
