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
import { InputAuth } from "components/input";
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
								<InputAuth
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

const IconArrowLeft = () => {
	const { colors } = useTheme();

	return (
		<Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
			<G clip-path="url(#clip0_128_861)">
				<Path
					d="M4.54494 14.1163C4.3106 14.3507 4.17895 14.6686 4.17895 15.0001C4.17895 15.3315 4.3106 15.6494 4.54494 15.8838L11.6162 22.9551C11.7315 23.0744 11.8694 23.1697 12.0219 23.2352C12.1744 23.3007 12.3385 23.3352 12.5044 23.3366C12.6704 23.3381 12.835 23.3064 12.9886 23.2436C13.1423 23.1807 13.2818 23.0879 13.3992 22.9706C13.5165 22.8532 13.6094 22.7136 13.6722 22.56C13.7351 22.4064 13.7667 22.2418 13.7653 22.0758C13.7638 21.9098 13.7293 21.7458 13.6638 21.5933C13.5983 21.4408 13.5031 21.3029 13.3837 21.1876L8.44619 16.2501L24.9999 16.2501C25.3315 16.2501 25.6494 16.1184 25.8838 15.8839C26.1182 15.6495 26.2499 15.3316 26.2499 15.0001C26.2499 14.6685 26.1182 14.3506 25.8838 14.1162C25.6494 13.8818 25.3315 13.7501 24.9999 13.7501L8.44619 13.7501L13.3837 8.81256C13.6114 8.5768 13.7374 8.26105 13.7345 7.93331C13.7317 7.60556 13.6002 7.29205 13.3685 7.06029C13.1367 6.82853 12.8232 6.69706 12.4954 6.69422C12.1677 6.69137 11.8519 6.81736 11.6162 7.04506L4.54494 14.1163Z"
					fill={colors.text}
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_128_861">
					<Rect
						width="30"
						height="30"
						fill="white"
						transform="translate(0 30) rotate(-90)"
					/>
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default FindAccountScreen;
