import {
	Text,
	SafeAreaView,
	Image,
	useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { TitleAuth } from "components/title";
import { useTheme } from "@react-navigation/native";
import { Button } from "components/button";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import AlbumCreateModal from "../tabs/album/modal/AlbumCreateModal";

const FirstAlbumScreen = ({
	toggleFirstAlbumModal,
}: {
	toggleFirstAlbumModal: () => void;
}) => {
	const [screen, setScreen] = useState<"intro" | "create">("intro");
	const { width } = useWindowDimensions();
	const { colors } = useTheme();

	return (
		<>
			{screen == "intro" ? (
				<SafeAreaView
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Animated.View>
						<Animated.View entering={FadeInDown.duration(1500)}>
							<TitleAuth style={{ marginTop: -80 }}>
								WELCOME
							</TitleAuth>
							<Image
								source={require("./../../../../assets/img/welcome.png")}
								style={{
									width: width / 2,
									height: width / 2,
									resizeMode: "contain",
									marginHorizontal: "auto",
								}}
							></Image>
							<Text style={{ fontSize: 24, textAlign: "center" }}>
								アルバムを作成して
							</Text>
							<Text
								style={{
									fontSize: 35,
									textAlign: "center",
									marginTop: 10,
									fontWeight: "500",
									color: colors.primary,
								}}
							>
								始めましょう!
							</Text>
						</Animated.View>
						<Animated.View
							entering={FadeInDown.duration(1500).delay(100)}
						>
							<Button
								onPress={() => setScreen("create")}
								style={{
									marginTop: 30,
									width: 150,
									marginHorizontal: "auto",
								}}
							>
								作成
							</Button>
						</Animated.View>
					</Animated.View>
				</SafeAreaView>
			) : (
				<Animated.View style={{ flex: 1 }} entering={FadeIn}>
					<AlbumCreateModal
						toggleCreateAlbumModal={toggleFirstAlbumModal}
						cancelale={false}
					/>
				</Animated.View>
			)}
		</>
	);
};

export default FirstAlbumScreen;
