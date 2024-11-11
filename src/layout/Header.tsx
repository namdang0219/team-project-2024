import { View, Text, useWindowDimensions, ViewProps } from "react-native";
import React, { ReactNode } from "react";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { Entypo, Feather } from "@expo/vector-icons";
import HeaderTitle from "../components/title/HeaderTitle";

export type HeaderProps = {
	title: string;
	rightContainer?: ReactNode;
};

const Header = ({
	title,
	rightContainer,
	style,
	...props
}: HeaderProps & ViewProps) => {
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();

	return (
		<BlurView
			style={{
				paddingTop: insets.top,
				position: "absolute",
				top: 0,
				zIndex: 1000,
				width,
			}}
			intensity={100}
			tint="light"
		>
			{/* header container  */}
			<View
				style={[
					{
						height: DIMENTIONS.HEADER_HEIGHT,
						flexDirection: "row",
						alignItems: "center",
						paddingHorizontal: DIMENTIONS.APP_PADDING + 6,
						justifyContent: "space-between",
					},
					style,
				]}
				{...props}
			>
				<HeaderTitle>{title}</HeaderTitle>
				{rightContainer}
			</View>
		</BlurView>
	);
};

export default Header;
