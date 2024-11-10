import { View, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { useNavigation, useTheme } from "@react-navigation/native";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { TitleAuth } from "components/title";
import { ThemedText } from "components/themed";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "components/input";
import { Button } from "components/button";
import handlePressBackground from "util/func/handlePressBackground";
import HeaderWithBack from "module/auth/HeaderWithBack";

const schema = Yup.object().shape({
	email: Yup.string()
		.email("メールを正しく入力しださい")
		.required("メールを入力しださい"),
});

const FindAccountScreen = () => {
	const { navigate } = useNavigation<any>();
	const {
		control,
		handleSubmit,
		formState: { isValid, errors },
	} = useForm<{ email: string }>({
		defaultValues: { email: "" },
		resolver: yupResolver(schema),
	});

	const handleFindAccount = (values: { email: string }) => {
		if (!isValid) {
			return;
		}
		console.log(values);
		navigate("VerifyCodeScreen");
	};

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
						<TitleAuth style={{ textAlign: "left", marginTop: 0 }}>
							アカウント探し
						</TitleAuth>
						{/* sub title  */}
						<ThemedText
							style={{
								marginTop: 10,
								fontSize: 16,
								marginBottom: 30,
							}}
						>
							アカウントを探すため、メールを入力してください
						</ThemedText>
						{/* input  */}
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
						{/* button  */}
						<Button
							style={{ marginTop: 26 }}
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

export default FindAccountScreen;
