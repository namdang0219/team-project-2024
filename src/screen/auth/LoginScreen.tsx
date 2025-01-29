import {
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { TitleAuth } from "components/title";
import { Button } from "components/button";
import LoginMethod from "module/auth/LoginMethod";
import { ThemedText, ThemedView } from "components/themed";
import handlePressBackground from "util/func/handlePressBackground";
import { CustomTouchableOpacity } from "components/custom";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { IAuth } from "./SignupScreen";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "components/input";
import { DIMENTIONS } from "constant/dimention";
import { Toast } from "toastify-react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "context/auth-context";

const loginScheme = Yup.object().shape({
	email: Yup.string()
		.email("メールを正しく入力しださい")
		.required("メールを入力しださい"),
	password: Yup.string()
		.required("メールを入力しださい")
		.min(6, "パスワード名を6文字以上入力してください")
		.max(10, "パスワード名を10文字以下入力してください"),
});

export default function LoginScreen() {
	const { navigate } = useNavigation<any>();
	const { colors } = useTheme();
	const { login } = useAuth();
	const [loading, setLoading] = useState<boolean>(false);
	const {
		handleSubmit,
		control,
		formState: { isValid, errors },
	} = useForm<IAuth>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(loginScheme),
	});

	const handleLogin = async (values: IAuth) => {
		if (!isValid) {
			return;
		}
		try {
			setLoading(true);
			await login(values.email, values.password);
			setLoading(false);
		} catch (error: any) {
			console.log(error.code);
			setLoading(false);
			Toast.error("ログイン情報が存在していません");
		}
	};

	return (
		<ThemedView style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={handlePressBackground}>
				<SafeAreaView
					style={{
						flex: 1,
						justifyContent: "space-between",
						marginHorizontal: DIMENTIONS.AUTH_PADDING,
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
							<Controller
								control={control}
								render={({
									field: { onChange, onBlur, value },
								}) => (
									<Input
										placeholder="メール"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										errorMessage={errors.email?.message}
									/>
								)}
								name="email"
							/>
							<Controller
								control={control}
								render={({
									field: { onChange, onBlur, value },
								}) => (
									<Input
										placeholder="パスワード"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										secureTextEntry
										errorMessage={errors.password?.message}
									/>
								)}
								name="password"
							/>
						</View>
						<CustomTouchableOpacity
							style={{ marginTop: 22, marginLeft: "auto" }}
							onPress={() => navigate("FindAccountScreen")}
						>
							<Text style={{ color: colors.primary }}>
								パスワード忘れた方？
							</Text>
						</CustomTouchableOpacity>
						{/* button  */}
						<Button
							loading={loading}
							style={{ marginTop: 10 }}
							onPress={handleSubmit(handleLogin)}
						>
							ログイン
						</Button>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 4,
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
