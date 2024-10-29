import {
	View,
	SafeAreaView,
	TouchableWithoutFeedback,
	StyleSheet,
	Text,
} from "react-native";
import React, { useState } from "react";
import { ThemedText } from "components/themed";
import { TitleAuth } from "components/title";
import { DIMENTIONS } from "constant/dimention";
import handlePressBackground from "util/func/handlePressBackground";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Button } from "components/button";
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
import HeaderWithBack from "module/auth/HeaderWithBack";

const CELL_COUNT = 4;

const VerifyCodeScreen = () => {
	const { navigate } = useNavigation<any>();
	const { colors } = useTheme();
	const [value, setValue] = useState("");
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	const styles = StyleSheet.create({
		codeFieldRoot: { marginHorizontal: 80 },
		cell: {
			width: 50,
			height: 50,
			fontSize: 30,
			fontWeight: "600",
			lineHeight: 50,
			borderRadius: 8,
			borderWidth: 1,
			borderColor: colors.primary,
			textAlign: "center",
		},
		focusCell: {
			borderColor: colors.primary,
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
						<TitleAuth style={{ textAlign: "left", marginTop: 0 }}>
							コード確認
						</TitleAuth>
						{/* sub title  */}
						<ThemedText
							style={{
								marginTop: 10,
								fontSize: 16,
								marginBottom: 30,
							}}
						>
							メールで届いたコードを入力してください
						</ThemedText>
					</View>
					{/* input  */}

					<CodeField
						ref={ref}
						{...props}
						value={value}
						onChangeText={setValue}
						cellCount={CELL_COUNT}
						keyboardType="number-pad"
						textContentType="oneTimeCode"
						rootStyle={styles.codeFieldRoot}
						testID="my-code-input"
						renderCell={({ index, symbol, isFocused }) => (
							<Text
								key={index}
								style={[
									styles.cell,
									isFocused && styles.focusCell,
								]}
								onLayout={getCellOnLayoutHandler(index)}
							>
								{symbol || (isFocused ? <Cursor /> : null)}
							</Text>
						)}
					/>

					{/* button  */}
					<Button
						style={{
							marginTop: 26,
							marginHorizontal: DIMENTIONS.AUTH_PADDING,
						}}
						// onPress={handleSubmit(handleFindAccount)}
						onPress={() => navigate("UserInfoScreen")}
					>
						次へ
					</Button>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default VerifyCodeScreen;
