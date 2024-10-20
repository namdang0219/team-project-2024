import {
	View,
	SafeAreaView,
	TouchableWithoutFeedback,
	Text,
	useWindowDimensions,
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
import Svg, { Circle, Ellipse, G, Mask, Path, Rect } from "react-native-svg";
import { CustomTouchableOpacity } from "components/custom";
import { LabelInputAuth } from "components/label";
import { ActionSheet, DateTimePicker } from "react-native-ui-lib";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconArrowDown } from "icon/auth";

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
							style={{
								width: 160,
								height: 160,
								borderRadius: 1000,
								alignItems: "center",
								justifyContent: "center",
								marginHorizontal: "auto",
								marginTop: 30,
							}}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
						>
							<ThemedView
								style={{
									width: 152,
									height: 152,
									borderRadius: 1000,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
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
									style={{
										height: 50,
										borderRadius:
											DIMENTIONS.AUTH_INPUT_BORDER_RADIUS,
										borderColor: colors.primary,
										borderWidth: 1,
										flexDirection: "row",
										alignItems: "center",
										paddingHorizontal: 16,
										justifyContent: "space-between",
									}}
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
									style={{
										height: 50,
										borderRadius:
											DIMENTIONS.AUTH_INPUT_BORDER_RADIUS,
										borderColor: colors.primary,
										borderWidth: 1,
										flexDirection: "row",
										alignItems: "center",
										paddingHorizontal: 16,
										justifyContent: "space-between",
									}}
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
									style={{
										height: 50,
										borderRadius:
											DIMENTIONS.AUTH_INPUT_BORDER_RADIUS,
										borderColor: colors.primary,
										borderWidth: 1,
										flexDirection: "row",
										alignItems: "center",
										paddingHorizontal: 16,
										justifyContent: "space-between",
									}}
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
							onPress={() => navigate("VerifyCodeScreen")}
						>
							次へ
						</Button>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

const AvatarDefault = () => {
	return (
		<Svg width="146" height="146" viewBox="0 0 146 146" fill="none">
			<Mask
				id="mask0_131_1342"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="146"
				height="146"
			>
				<Circle
					cx="72.9185"
					cy="72.9186"
					r="71.8073"
					fill="#E37171"
					stroke="black"
				/>
			</Mask>
			<G mask="url(#mask0_131_1342)">
				<Rect
					x="-0.564453"
					y="0.611328"
					width="145.79"
					height="145.79"
					fill="#9B9B9B"
				/>
				<Ellipse
					cx="72.3307"
					cy="61.7492"
					rx="28.2175"
					ry="28.2175"
					fill="white"
				/>
				<Path
					d="M125.238 140.48C125.238 167.752 103.762 194.563 72.9185 194.563C42.075 194.563 20.5986 167.752 20.5986 140.48C20.5986 113.208 42.075 95.802 72.9185 95.802C103.762 95.802 125.238 113.208 125.238 140.48Z"
					fill="white"
				/>
			</G>
		</Svg>
	);
};

export default UserInfoScreen;
