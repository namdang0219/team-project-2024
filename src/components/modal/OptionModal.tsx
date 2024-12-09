import { Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import React, { ReactNode, useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";

export interface IOption {
	label: string;
	icon: React.ReactNode;
	action: () => void;
}

const OptionModal = ({
	options,
	iconStyle,
	children,
}: {
	options: IOption[];
	iconStyle?: any;
	children?: ReactNode;
}) => {
	const [showOption, setShowOption] = useState(false);
	const [showOptionPosition, setShowOptionPosition] = useState<{
		x: number;
		y: number;
	}>({
		x: 0,
		y: 0,
	});
	const showOptionButtonRef = useRef<TouchableOpacity>(null);

	const openMenu = () => {
		showOptionButtonRef.current?.measure(
			(
				x: number,
				y: number,
				width: number,
				height: number,
				pageX: number,
				pageY: number
			) => {
				setShowOptionPosition({ x: pageX, y: pageY + height + 8 }); // Lấy vị trí nút + chiều cao
				setShowOption(true);
			}
		);
	};

	return (
		<>
			<TouchableOpacity
				style={{ position: "relative" }}
				onPress={openMenu}
				ref={showOptionButtonRef}
			>
				<Entypo
					name="dots-three-horizontal"
					size={20}
					style={iconStyle}
				/>
			</TouchableOpacity>

			<Modal visible={showOption} animationType="fade" transparent>
				<TouchableOpacity
					activeOpacity={1}
					style={{
						flex: 1,
						position: "relative",
					}}
					onPressIn={() => setShowOption(false)}
				>
					<BlurView
						tint="extraLight"
						intensity={95}
						style={[
							styles.contentContainer,
							{
								position: "absolute",
								top: showOptionPosition.y,
							},
						]}
					>
						{options.map((item: IOption, index) => (
							<CustomTouchableOpacity
								key={index}
								style={[
									styles.optionItem,
									{
										borderBottomWidth:
											index === options.length - 1
												? 0
												: 1,
									},
								]}
								onPress={() => {
									setShowOption(false);
									item.action();
								}}
							>
								<Text>{item.label}</Text>
								{item.icon}
							</CustomTouchableOpacity>
						))}
					</BlurView>
				</TouchableOpacity>
			</Modal>

			{/* option pressed display screen  */}
			{children}
		</>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		width: 200,
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderRadius: 12,
		overflow: "hidden",
		position: "absolute",
		right: DIMENTIONS.APP_PADDING,
	},
	optionItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 10,
		borderBlockColor: "rgba(255, 255, 255, 0.5)",
	},
});

export default OptionModal;