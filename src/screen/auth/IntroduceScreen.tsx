import {
	View,
	Text,
	SafeAreaView,
	Image,
	useWindowDimensions,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors } from "../../util/theme/Colors";
import { useNavigation } from "@react-navigation/native";

export default function IntroduceScreen() {
	const { width } = useWindowDimensions();
	const { navigate } = useNavigation<any>();

	return (
		<SafeAreaView
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Image
				source={require("./../../../assets/img/walkthrought.png")}
				style={{ width: width, height: 430 }}
			></Image>
			<Text style={{ fontSize: 20, fontWeight: "600", marginTop: 20 }}>
				Record your wonderful memories
			</Text>

			{/* Button  */}
			<View style={{ marginTop: 40 }}>
				<TouchableOpacity
					style={{
						backgroundColor: Colors.light.primary,
						width: 216,
						height: 60,
						justifyContent: "center",
						alignItems: "center",
						borderRadius: 1000,
					}}
                    onPress={() => navigate('SignupScreen')}
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
				<TouchableOpacity style={{ marginTop: 12 }} onPress={() => navigate('LoginScreen')}>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "500",
							textAlign: "center",
						}}
					>
						ログイン
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
