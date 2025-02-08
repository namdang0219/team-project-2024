import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import { CustomTouchableOpacity } from "components/custom";
import {
	IconExposure,
	IconFlash,
	IconFrame,
	IconGrid,
	IconRotate,
} from "icon/camera";

type CameraViewBottomActionProps = {
	toggleGrid: () => void;
	toggleExposureSlider: () => void;
	toggleFlash: () => void;
	toggleCamera: () => void;
	grid: boolean;
	showExposureSlider: boolean;
	flash: boolean;
	backCamera: boolean;
};

const CameraViewBottomAction: FC<CameraViewBottomActionProps> = ({
	toggleGrid,
	toggleExposureSlider,
	toggleFlash,
	toggleCamera,
	grid,
	showExposureSlider,
	flash,
	backCamera,
}) => {
	return (
		<View style={styles.container}>
			<CustomTouchableOpacity style={styles.featureItem}>
				<IconFrame gradient={false} />
			</CustomTouchableOpacity>
			<CustomTouchableOpacity
				style={styles.featureItem}
				onPress={toggleGrid}
			>
				<IconGrid gradient={grid ? true : false} />
			</CustomTouchableOpacity>
			<CustomTouchableOpacity
				style={styles.featureItem}
				onPress={toggleExposureSlider}
			>
				<IconExposure gradient={showExposureSlider} />
			</CustomTouchableOpacity>
			<CustomTouchableOpacity
				style={styles.featureItem}
				onPress={toggleFlash}
			>
				<IconFlash gradient={flash} />
			</CustomTouchableOpacity>
			<CustomTouchableOpacity
				style={styles.featureItem}
				onPress={toggleCamera}
			>
				<IconRotate gradient={backCamera} />
			</CustomTouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	featureItem: {
		width: 40,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default CameraViewBottomAction;
