import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Header from "layout/Header";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Button } from "components/button";
import { CustomTouchableOpacity } from "components/custom";
import { signOut } from "firebase/auth";
import { auth } from "../../../../../firebaseConfig";
import { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "context/auth-context";

const SettingScreen = () => {
	const { colors } = useTheme();
	const [loading, setLoading] = useState<boolean>(false);
	const { logout } = useAuth();

	const handleLogout = async () => {
		try {
			setLoading(true);
			await logout();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Header
				canGoBack
				leftTitle="設定"
				leftTitleStyle={{ color: colors.iosBlue }}
				backIconColor={colors.iosBlue}
				rightContainer={
					<View>
						{loading ? (
							<ActivityIndicator
								size="small"
								color={colors.iosBlue}
							/>
						) : (
							<CustomTouchableOpacity onPress={handleLogout}>
								<Text style={{ color: colors.error }}>
									ログアウト
								</Text>
							</CustomTouchableOpacity>
						)}
					</View>
				}
			/>
		</View>
	);
};

export default SettingScreen;
