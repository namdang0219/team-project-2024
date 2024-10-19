import {
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-ui-lib";
import { useNavigation, useTheme } from "@react-navigation/native";
import { TitleAuth } from "components/title";
import { Button } from "components/button";
import LoginMethod from "../../module/auth/LoginMethod";
import { ThemedText, ThemedView } from "components/themed";
import handlePressBackground from "util/func/handlePressBackground";
import { CustomTouchableOpacity } from "components/custom";

const SignupScreen = () => {
	const { navigate } = useNavigation<any>();
	const { colors } = useTheme();
	const [isChecked, setIsChecked] = useState<boolean>(false);

	return (
		<ThemedView style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={handlePressBackground}>
				<SafeAreaView
					style={{ flex: 1, justifyContent: "space-between" }}
				>
					<View>
						{/* title  */}
						<TitleAuth>新規登録</TitleAuth>
						{/* logo  */}
						<Image
							source={require("./../../../assets/img/BreadCat.png")}
							style={{
								width: 150,
								height: 150,
								marginHorizontal: "auto",
							}}
						></Image>
						<View style={{ gap: 22, marginTop: 20 }}>
							<TextInput
								placeholder="ユーザー名"
								style={{
									padding: 16,
									borderWidth: 1,
									borderColor: colors.primary,
									borderRadius: 8,
									marginHorizontal: 30,
									color: "white",
								}}
							></TextInput>
							<TextInput
								placeholder="メール"
								style={{
									padding: 16,
									borderWidth: 1,
									borderColor: colors.primary,
									marginHorizontal: 30,
									borderRadius: 8,
								}}
							></TextInput>
							<TextInput
								placeholder="パスワード"
								style={{
									padding: 16,
									borderWidth: 1,
									borderColor: colors.primary,
									marginHorizontal: 30,
									borderRadius: 8,
								}}
							></TextInput>
						</View>
						{/* check box field  */}
						<View
							style={{
								marginTop: 25,
								marginHorizontal: 40,
								flexDirection: "row",
								gap: 6,
								alignItems: "center",
							}}
						>
							<Checkbox
								value={isChecked}
								style={{ transform: [{ scale: 0.8 }] }}
								onValueChange={() => setIsChecked(!isChecked)}
							/>
							<ThemedText>条件を全部同意します。</ThemedText>
						</View>
						{/* button  */}
						<Button style={{ marginTop: 10 }}>登録</Button>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 4,
								marginHorizontal: 30,
								justifyContent: "center",
								marginTop: 15,
							}}
						>
							<ThemedText>既にアカウントお持ちの方？</ThemedText>
							<CustomTouchableOpacity
								onPress={() => navigate("LoginScreen")}
							>
								<Text
									style={{
										color: colors.primary,
										fontWeight: "600",
									}}
								>
									ログイン
								</Text>
							</CustomTouchableOpacity>
						</View>
					</View>
					<LoginMethod></LoginMethod>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		</ThemedView>
	);
};

export default SignupScreen;
