import { View, useWindowDimensions } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Dialog } from "react-native-ui-lib";
import LoadingState from "./qrCodeModal/LoadingState";
import NoneUserState from "./qrCodeModal/NoneUserState";
import UserFound from "./qrCodeModal/UserFound";
import UserNotFound from "./qrCodeModal/UserNotFound";

export type QrCodeModalState =
	| "none-user"
	| "loading"
	| "user-found"
	| "user-not-found";

type QrCodeModalProps = {
	qrCodeModal: boolean;
	setQrCodeModal: Dispatch<SetStateAction<boolean>>;
	qrCodeModalState: QrCodeModalState;
	setQrCodeModalState: Dispatch<SetStateAction<QrCodeModalState>>;
};

const QrCodeModal = ({
	qrCodeModal,
	setQrCodeModal,
	qrCodeModalState,
	setQrCodeModalState,
}: QrCodeModalProps) => {
	const { width } = useWindowDimensions();

	const renderQrCodeModalState = () => {
		switch (qrCodeModalState) {
			case "none-user":
				return <NoneUserState setQrCodeModal={setQrCodeModal} />;
			case "loading":
				return <LoadingState />;
			case "user-found":
				return <UserFound setQrCodeModal={setQrCodeModal} />;
			case "user-not-found":
				return <UserNotFound />;
			default:
				return null;
		}
	};

	return (
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
					paddingTop: qrCodeModalState === "none-user" ? 5 : 0,
					paddingBottom: qrCodeModalState === "none-user" ? 30 : 0,
				}}
			>
				{renderQrCodeModalState()}
			</View>
		</Dialog>
	);
};

export default QrCodeModal;
