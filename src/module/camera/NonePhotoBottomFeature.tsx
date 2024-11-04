import { View, StyleSheet } from "react-native";
import React from "react";
import { CustomTouchableOpacity } from "components/custom";
import {
	IconExposure,
	IconFlash,
	IconFrame,
	IconGrid,
	IconRotate,
} from "icon/camera";

type NonePhotoBottomFeatureProps = {
	grid: boolean;
	toggleGrid: () => void;
	flash: boolean;
	toggleFlash: () => void;
	backCamera: boolean;
	toggleCamera: () => void;
	showExposureSlider: boolean;
	toggleExposureSlider: () => void;
};

const NonePhotoBottomFeature = ({
	grid,
	toggleGrid,
	flash,
	toggleFlash,
	backCamera,
	toggleCamera,
	showExposureSlider,
	toggleExposureSlider,
}: NonePhotoBottomFeatureProps) => {
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
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flex: 1,
		marginHorizontal: 40,
		opacity: 0.85,
	},
	featureItem: {
		width: 40,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default NonePhotoBottomFeature;
