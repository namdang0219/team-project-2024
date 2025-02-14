import {
	View,
	Text,
	Image,
	SafeAreaView,
	TouchableWithoutFeedback,
	Alert,
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
import Input from "../../components/input/Input";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DIMENTIONS } from "constant/dimention";
import { useAuth } from "context/auth-context";

export interface IAuth {
	username: string;
	email: string;
	password: string;
}

const signupSchema = Yup.object().shape({
	username: Yup.string()
		.required("ユーザー名を入力してください")
		.min(5, "ユーザー名を５文字以上入力してください")
		.max(10, "ユーザー名を10文字以下入力してください"),
	email: Yup.string()
		.email("メールを正しく入力しださい")
		.required("メールを入力しださい"),
	password: Yup.string()
		.required("メールを入力しださい")
		.min(6, "パスワード名を6文字以上入力してください")
		.max(10, "パスワード名を10文字以下入力してください"),
});

const SignupScreen = () => {
	const { navigate } = useNavigation<any>();
	const { colors } = useTheme();
	const { signUp } = useAuth();
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const {
		handleSubmit,
		control,
		formState: { isValid, errors },
	} = useForm<IAuth & { username: string }>({
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
		resolver: yupResolver(signupSchema),
	});

	const handleSignup = async (values: IAuth) => {
		if (!isValid) {
			return;
		}
		if (!isChecked) {
			Alert.alert("利用規約に同意してください");
			return;
		}

		try {
			setLoading(true);
			await signUp(values.username, values.email, values.password);
		} catch (error: any) {
			console.log(error.code);
		} finally {
			setLoading(false);
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
							<Controller
								control={control}
								render={({
									field: { onChange, onBlur, value },
								}) => (
									<Input
										placeholder="ユーザー名"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										errorMessage={errors.username?.message}
									/>
								)}
								name="username"
							/>
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
										errorMessage={errors.password?.message}
										secureTextEntry
									/>
								)}
								name="password"
							/>
						</View>
						<View
							style={{
								marginTop: 25,
								flexDirection: "row",
								marginLeft: 10,
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
						<Button
							style={{ marginTop: 10 }}
							onPress={handleSubmit(handleSignup)}
							loading={loading}
						>
							登録
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
