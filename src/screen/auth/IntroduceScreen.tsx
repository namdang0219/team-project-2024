import { View, SafeAreaView, Image, useWindowDimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "components/themed";
import { CustomTouchableOpacity } from "components/custom";
import { Button } from "components/button";

export default function IntroduceScreen() {
	const { width } = useWindowDimensions();
	const { navigate } = useNavigation<any>();

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
			<Image
				source={require("./../../../assets/img/walkthrought.png")}
				style={{
					width: width,
					height: 430,
				}}
			></Image>
			<ThemedText
				style={{
					fontSize: 20,
					fontWeight: "600",
					marginTop: 20,
					textAlign: "center",
				}}
			>
				Record your wonderful memories
			</ThemedText>

			{/* Button  */}
			<View style={{ marginTop: 40 }}>
				<Button
					style={{ height: 60, width: 240, marginHorizontal: "auto" }}
					onPress={() => navigate("SignupScreen")}
				>
					新規登録
				</Button>
				<CustomTouchableOpacity
					style={{ marginTop: 18 }}
					onPress={() => navigate("LoginScreen")}
				>
					<ThemedText
						style={{
							fontSize: 18,
							fontWeight: "500",
							textAlign: "center",
						}}
					>
						ログイン
					</ThemedText>
				</CustomTouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
