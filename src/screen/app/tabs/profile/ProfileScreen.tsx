import {
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
	useWindowDimensions,
	Text,
	Button as RNButton,
} from "react-native";
import React from "react";
import { CustomTouchableOpacity } from "components/custom";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import Header from "layout/Header";
import { ThemedText, ThemedView } from "components/themed";
import { LinearGradient } from "expo-linear-gradient";
import { DIMENTIONS } from "constant/dimention";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";
import { Dialog } from "react-native-ui-lib";
import { useToggle } from "hook/useToggle";
import QRCodeStyled, { GradientProps } from "react-native-qrcode-styled";
import { Button } from "components/button";
import { GLOBAL_GRADIENT } from "util/theme/themeColors";
import {
	BarcodeScanningResult,
	CameraView,
	useCameraPermissions,
} from "expo-camera";
import { Toast } from "toastify-react-native";

const ProfileScreen = () => {
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();
	const { colors } = useTheme();
	const [qrCodeModal, , setQrCodeModal] = useToggle(false);
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text>We need your permission to show the camera</Text>
				<RNButton
					onPress={requestPermission}
					title="grant permission"
				/>
			</View>
		);
	}

	const ProfileHeader = () => {
		return (
			<>
				<View
					style={{
						position: "relative",
						marginHorizontal: "auto",
					}}
				>
					<LinearGradient
						colors={["#D823FF", "#9A33EF"]}
						style={styles.avatarContainerGradient}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
					>
						<ThemedView style={styles.avatarContainerWhite}>
							<Image
								source={{
									uri: "https://i.pinimg.com/564x/80/d9/0f/80d90f5c9d70000402c52115fee99bdb.jpg",
								}}
								style={{
									width: 146,
									height: 146,
									borderRadius: 1000,
								}}
							/>
						</ThemedView>
					</LinearGradient>
				</View>

				{/* base info  */}
				<View
					style={{
						marginHorizontal: "auto",
						alignItems: "center",
						gap: 4,
					}}
				>
					<ThemedText
						style={{
							fontSize: 20,
							fontWeight: "600",
							marginTop: 6,
						}}
					>
						MeowCopter🍓
					</ThemedText>
					<ThemedText style={{ opacity: 0.4 }}>
						meowcopter99@gmail.com
					</ThemedText>
				</View>

				{/* post and friends number  */}
				<View
					style={{
						flexDirection: "row",
						gap: 60,
						justifyContent: "center",
						marginTop: 15,
					}}
				>
					<View style={{ alignItems: "center", gap: 2 }}>
						<ThemedText style={{ opacity: 0.4 }}>投稿</ThemedText>
						<ThemedText style={{ fontWeight: "600", fontSize: 20 }}>
							321
						</ThemedText>
					</View>
					<View style={{ alignItems: "center", gap: 2 }}>
						<ThemedText style={{ opacity: 0.4 }}>友達</ThemedText>
						<ThemedText style={{ fontWeight: "600", fontSize: 20 }}>
							321
						</ThemedText>
					</View>
				</View>

				{/* profile feature button  */}
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 10,
						justifyContent: "center",
						marginTop: 10,
						marginBottom: 5,
					}}
				>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 4,
							borderWidth: 1,
							borderColor: colors.text,
							height: 30,
							paddingHorizontal: 16,
							borderRadius: 6,
							opacity: 0.5,
						}}
					>
						<Feather name="edit" size={16} />
						<ThemedText>情報を編集</ThemedText>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 4,
							borderWidth: 1,
							borderColor: colors.text,
							height: 30,
							paddingHorizontal: 16,
							borderRadius: 6,
							opacity: 0.4,
						}}
					>
						<Feather name="share-2" size={16} />
						<ThemedText>シェア</ThemedText>
					</TouchableOpacity>
				</View>
			</>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<Header
				title="Profile"
				rightContainer={
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 20,
						}}
					>
						<CustomTouchableOpacity
							onPress={() => setQrCodeModal(true)}
						>
							<Ionicons
								name="qr-code-outline"
								size={24}
								color="black"
							/>
						</CustomTouchableOpacity>
						<CustomTouchableOpacity>
							<AntDesign name="setting" size={26} color="black" />
						</CustomTouchableOpacity>

						{/* qr code dialog  */}
						<Dialog
							visible={qrCodeModal}
							width={width * 0.9}
							height={width * 0.9}
							onDismiss={() => setQrCodeModal(false)}
						>
							<View
								style={{
									backgroundColor: "white",
									width: width * 0.9,
									aspectRatio: "1/1",
									borderRadius: 15,
									overflow: "hidden",
									alignItems: "center",
									justifyContent: "center",
									paddingTop: 5,
									paddingBottom: 30,
								}}
							>
								<Tabs.Container
									headerContainerStyle={{
										shadowOpacity: 0,
									}}
									width={width * 0.75}
									renderTabBar={(props) => (
										<MaterialTabBar
											{...props}
											indicatorStyle={{
												backgroundColor: colors.primary,
											}}
											activeColor={colors.primary}
										/>
									)}
								>
									<Tabs.Tab name="code" label="コード">
										<View
											style={{
												flex: 1,
												justifyContent: "space-between",
											}}
										>
											<View
												style={{
													marginHorizontal: "auto",
												}}
											>
												<QRCodeStyled
													data={"Meowcopter"}
													style={{
														backgroundColor:
															"white",
														marginTop: 65,
													}}
													color={colors.primary}
													gradient={
														{
															type: "linear",
															colors: [
																GLOBAL_GRADIENT.STOP_1,
																GLOBAL_GRADIENT.STOP_2,
															],
															start: [0, 0], // start point [x, y] (0 -> 0%, 1 -> 100%)
															end: [1, 1], // end point [x, y] (0 -> 0%, 1 -> 100%)
														} as GradientProps
													}
													pieceSize={8.8}
												/>
											</View>
											<Button
												style={{
													marginHorizontal: 50,
													backgroundColor: "white",
													borderWidth: 1,
													borderColor: colors.primary,
												}}
												onPress={() => {
													setQrCodeModal(false);
													Toast.success("コピー済み");
												}}
											>
												<View
													style={{
														flexDirection: "row",
														alignItems: "center",
														gap: 6,
													}}
												>
													<Feather
														name="link"
														size={20}
														color={colors.primary}
													/>
													<Text
														style={{
															color: colors.primary,
															fontSize: 16,
														}}
													>
														リンクをコピー
													</Text>
												</View>
											</Button>
										</View>
									</Tabs.Tab>

									<Tabs.Tab name="scan" label="スキャン">
										<View
											style={{
												flex: 1,
												justifyContent: "space-between",
											}}
										>
											<View
												style={{
													marginHorizontal: "auto",
													marginTop: 65,
												}}
											>
												<View
													style={{
														height: 180,
														width: 180,
														backgroundColor: "pink",
														borderRadius:
															DIMENTIONS.MODAL_BORDER_RADIUS,
														overflow: "hidden",
														position: "relative",
													}}
												>
													<CameraView
														style={{ flex: 1 }}
														facing="back"
														mute
														barcodeScannerSettings={{
															barcodeTypes: [
																"qr",
															],
														}}
														onBarcodeScanned={(
															scanningResult: BarcodeScanningResult
														) =>
															scanningResult.data
														}
													/>
													<Entypo
														name="chevron-thin-right"
														size={40}
														color={"white"}
														style={{
															opacity: 0.8,
															position:
																"absolute",
															top: 10,
															left: 10,
															transform: [
																{
																	rotate: "-135deg",
																},
															],
														}}
													/>
													<Entypo
														name="chevron-thin-right"
														size={40}
														color={"white"}
														style={{
															opacity: 0.8,
															position:
																"absolute",
															top: 10,
															right: 10,
															transform: [
																{
																	rotate: "-45deg",
																},
															],
														}}
													/>
													<Entypo
														name="chevron-thin-right"
														size={40}
														color={"white"}
														style={{
															opacity: 0.8,
															position:
																"absolute",
															bottom: 10,
															right: 10,
															transform: [
																{
																	rotate: "45deg",
																},
															],
														}}
													/>
													<Entypo
														name="chevron-thin-right"
														size={40}
														color={"white"}
														style={{
															opacity: 0.8,
															position:
																"absolute",
															bottom: 10,
															left: 10,
															transform: [
																{
																	rotate: "135deg",
																},
															],
														}}
													/>
												</View>
											</View>
											<Button
												style={{
													marginHorizontal: 50,
													backgroundColor: "white",
													borderWidth: 1,
													borderColor: colors.primary,
												}}
												onPress={() => {
													setQrCodeModal(false);
												}}
											>
												<Text
													style={{
														color: colors.primary,
														fontSize: 16,
													}}
												>
													キャンセル
												</Text>
											</Button>
										</View>
									</Tabs.Tab>
								</Tabs.Container>
							</View>
						</Dialog>
					</View>
				}
			/>

			{/* content  */}
			<View
				style={{
					paddingTop: insets.top + DIMENTIONS.HEADER_HEIGHT,
					flex: 1,
				}}
			>
				{/* tab  */}
				<Tabs.Container
					renderHeader={ProfileHeader}
					headerContainerStyle={{ shadowOpacity: 0.1 }}
					renderTabBar={(props) => (
						<MaterialTabBar
							{...props}
							indicatorStyle={{
								backgroundColor: colors.primary,
							}}
							activeColor={colors.primary}
						/>
					)}
				>
					<Tabs.Tab name="posts" label="投稿">
						<Tabs.FlatList
							data={new Array(20).fill(null)}
							columnWrapperStyle={{ gap: 5 }}
							contentContainerStyle={{
								paddingTop: 10,
								gap: 5,
								paddingHorizontal: 5,
							}}
							numColumns={4}
							renderItem={({ item, index }) => {
								return (
									<View key={index}>
										<Image
											source={{
												uri: "https://i.pinimg.com/564x/7b/6a/dc/7b6adc7c192632eb9e0cd71fad1415ca.jpg",
											}}
											style={{
												width:
													(width - 5 * 2 - 3 * 5) / 4,
												aspectRatio: "1/1",
												borderRadius: 4,
											}}
										/>
									</View>
								);
							}}
						/>
					</Tabs.Tab>

					<Tabs.Tab name="tags" label="タグ">
						<Tabs.FlatList
							data={new Array(10).fill(null)}
							columnWrapperStyle={{ gap: 5 }}
							contentContainerStyle={{
								paddingTop: 16,
								gap: 5,
								paddingHorizontal: DIMENTIONS.APP_PADDING,
							}}
							numColumns={4}
							renderItem={({ item, index }) => {
								return (
									<View key={index}>
										<Image
											source={{
												uri: "https://i.pinimg.com/736x/85/c6/e0/85c6e08b42d8567b5065ec37e6c315f4.jpg",
											}}
											style={{
												width:
													(width -
														DIMENTIONS.APP_PADDING *
															2 -
														3 * 5) /
													4,
												aspectRatio: "1/1",
												borderRadius: 4,
											}}
										/>
									</View>
								);
							}}
						/>
					</Tabs.Tab>
				</Tabs.Container>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	avatarContainerGradient: {
		width: 160,
		height: 160,
		borderRadius: 1000,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: "auto",
	},
	avatarContainerWhite: {
		width: 152,
		height: 152,
		borderRadius: 1000,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ProfileScreen;
