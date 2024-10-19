import {
	View,
	Text,
	SafeAreaView,
	Image,
	useWindowDimensions,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import ThemedView from "../../components/themed/ThemedView";
import { ThemedText } from "components/themed";

export default function IntroduceScreen() {
	const { width } = useWindowDimensions();
	const { navigate } = useNavigation<any>();
	const { colors } = useTheme();

	return (
		<SafeAreaView
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Image
				source={require("./../../../assets/img/walkthrought.png")}
				style={{
					width: width,
					height: 430,
				}}
			></Image>
			<ThemedText style={{ fontSize: 20, fontWeight: "600", marginTop: 20 }}>
				Record your wonderful memories
			</ThemedText>

			{/* Button  */}
			<View style={{ marginTop: 40 }}>
				<TouchableOpacity
					style={{
						backgroundColor: colors.primary,
						width: 216,
						height: 60,
						justifyContent: "center",
						alignItems: "center",
						borderRadius: 1000,
					}}
					onPress={() => navigate("SignupScreen")}
				>
					<Text
						style={{
							color: "white",
							fontSize: 18,
							fontWeight: "600",
						}}
					>
						新規登録
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
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
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
