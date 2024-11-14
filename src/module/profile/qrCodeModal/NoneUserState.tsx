import { View, Text, useWindowDimensions } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import { useTheme } from "@react-navigation/native";
import QRCodeStyled, { GradientProps } from "react-native-qrcode-styled";
import { GLOBAL_GRADIENT } from "util/theme/themeColors";
import { Button } from "components/button";
import { Toast } from "toastify-react-native";
import { DIMENTIONS } from "constant/dimention";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import { Entypo, Feather } from "@expo/vector-icons";

const NoneUserState = ({
	setQrCodeModal,
}: {
	setQrCodeModal: Dispatch<SetStateAction<boolean>>;
}) => {
	const { width } = useWindowDimensions();
	const { colors } = useTheme();

	return (
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
								backgroundColor: "white",
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
								borderRadius: DIMENTIONS.MODAL_BORDER_RADIUS,
								overflow: "hidden",
								position: "relative",
							}}
						>
							<CameraView
								style={{ flex: 1 }}
								facing="back"
								mute
								barcodeScannerSettings={{
									barcodeTypes: ["qr"],
								}}
								onBarcodeScanned={(
									scanningResult: BarcodeScanningResult
								) => scanningResult.data}
							/>
							<Entypo
								name="chevron-thin-right"
								size={40}
								color={"white"}
								style={{
									opacity: 0.8,
									position: "absolute",
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
									position: "absolute",
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
									position: "absolute",
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
									position: "absolute",
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
	);
};

export default NoneUserState;
