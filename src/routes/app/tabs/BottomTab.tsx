import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraStack from "./stack/CameraStack";
import MapStack from "./stack/MapStack";
import AlbumStack from "./stack/AlbumStack";
import TabBar from "./TabBar";
import NotificationStack from "./stack/NotificationStack";
import ProfileStack from "./stack/ProfileStack";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { Image, Modal, Text, useWindowDimensions } from "react-native";
import { useToggle } from "hook/useToggle";
import AlbumCreateModal from "screen/app/tabs/album/modal/AlbumCreateModal";
import { Button as CustomButton } from "components/button";
import { AutoHeightImage } from "components/image";
import { useTheme } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Reanimated from "react-native-reanimated";

const Tab = createBottomTabNavigator();

const AnimatedImage = Reanimated.createAnimatedComponent(AutoHeightImage);
const AnimatedButton = Reanimated.createAnimatedComponent(CustomButton);

const BottomTab = () => {
	const albums = useSelector((state: RootState) => state.albums);
	const { colors } = useTheme();
	const { width } = useWindowDimensions();
	const [
		firstAlbumCreateModal,
		toogleFirstAlbumCreateModal,
		setFirstAlbumCreateModal,
	] = useToggle(false);
	const [createAlbumModal, toogleCreateAlbumModal, setCreateAlbumModal] =
		useToggle(false);

	useEffect(() => {
		if (albums && albums.length === 0) {
			setFirstAlbumCreateModal(true);
		}
		return () => {
			setFirstAlbumCreateModal(false);
		};
	}, [albums]);

	return (
		<>
			<Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
				<Tab.Screen
					name="AlbumStack"
					component={AlbumStack}
					options={{ headerShown: false }}
				/>
				<Tab.Screen
					name="MapStack"
					component={MapStack}
					options={{ headerShown: false }}
				/>
				<Tab.Screen name="CameraStack" component={CameraStack} />
				<Tab.Screen
					name="NotificationStack"
					component={NotificationStack}
					options={{ headerShown: false }}
				/>
				<Tab.Screen
					name="ProfileStack"
					component={ProfileStack}
					options={{ headerShown: false }}
				/>
			</Tab.Navigator>

			{/* first album modal  */}

			<Modal visible={firstAlbumCreateModal} animationType="slide">
				{/* <AlbumCreateModal
					toggleCreateAlbumModal={toogleFirstAlbumCreateModal}
				/> */}

				<Animated.View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
					entering={FadeInDown}
				>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "600",
							marginBottom: 10,
						}}
					>
						<Text style={{ color: colors.primary }}>アルバム</Text>
						を作成しよう
					</Text>

					<AnimatedImage
						source={require("../../../../assets/img/createFirstAlbum.png")}
						width={width / 2}
						style={{ marginBottom: 20 }}
						entering={FadeInDown}
					/>
					<AnimatedButton
						style={{ width: width / 2 }}
						entering={FadeInDown}
						onPress={() => setCreateAlbumModal(true)}
					>
						作成
					</AnimatedButton>

					<Modal visible={createAlbumModal} animationType="slide">
						<AlbumCreateModal
							setCreateAlbumModal={setCreateAlbumModal}
							setFirstAlbumCreateModal={setFirstAlbumCreateModal}
							cancelable={false}
						></AlbumCreateModal>
					</Modal>
				</Animated.View>
			</Modal>
		</>
	);
};

export default BottomTab;
