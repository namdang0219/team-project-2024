import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { TitleAuth } from "components/title";
import { Button } from "components/button";
import LoginMethod from "../../module/auth/LoginMethod";
import { ThemedText, ThemedView } from "components/themed";
import handlePressBackground from "util/func/handlePressBackground";
import { CustomTouchableOpacity } from "components/custom";

export default function LoginScreen() {
	const { navigate } = useNavigation<any>();
	const { colors } = useTheme();

	return (
		<ThemedView style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={handlePressBackground}>
				<SafeAreaView
					style={{
						flex: 1,
						justifyContent: "space-between",
					}}
				>
					<View>
						{/* title  */}
						<TitleAuth>ログイン</TitleAuth>
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
						{/* button  */}
						<Button style={{ marginTop: 24 }}>ログイン</Button>
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
							<ThemedText>アカウントお持ちでない方？</ThemedText>
							<CustomTouchableOpacity
								onPress={() => navigate("SignupScreen")}
							>
								<Text
									style={{
										color: colors.primary,
										fontWeight: "600",
									}}
								>
									新規登録
								</Text>
							</CustomTouchableOpacity>
						</View>
					</View>
					<LoginMethod></LoginMethod>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		</ThemedView>
	);
}
