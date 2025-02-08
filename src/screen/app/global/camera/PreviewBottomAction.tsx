import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import { CustomTouchableOpacity } from "components/custom";
import {
	IconColorFilter,
	IconLocation,
	IconPlus,
	IconSlider,
	IconTag,
} from "icon/camera-edit";

type PreviewBottomActionProps = {
	toggleShowAddItem: () => void;
	showAddItem: boolean;
};

const PreviewBottomAction: FC<PreviewBottomActionProps> = ({
	toggleShowAddItem,
	showAddItem,
}) => {
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				flex: 1,
				marginHorizontal: 40,
				opacity: 0.85,
			}}
		>
			<CustomTouchableOpacity style={styles.featureItem}>
				<IconColorFilter gradient={false} />
			</CustomTouchableOpacity>
			<CustomTouchableOpacity style={styles.featureItem}>
				<IconSlider gradient={false} />
			</CustomTouchableOpacity>
			<CustomTouchableOpacity
				style={styles.featureItem}
				onPress={toggleShowAddItem}
				// onPress={toggleStickerModal}
			>
				<IconPlus gradient={showAddItem} />
			</CustomTouchableOpacity>
			<CustomTouchableOpacity style={styles.featureItem}>
				<IconTag gradient={false} />
			</CustomTouchableOpacity>
			<CustomTouchableOpacity style={styles.featureItem}>
				<IconLocation gradient={false} />
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

export default PreviewBottomAction;
