import {
	View,
	Text,
	useWindowDimensions,
	ViewProps,
	StyleProp,
	TextStyle,
	useColorScheme,
} from "react-native";
import React, { ReactNode } from "react";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { Ionicons } from "@expo/vector-icons";
import HeaderTitle from "../components/title/HeaderTitle";
import { useNavigation } from "@react-navigation/native";

export type HeaderProps = {
	title?: string;
	intensity?: number;
	canGoBack?: boolean;
	leftTitle?: string;
	backIconColor?: string;
	leftTitleStyle?: StyleProp<TextStyle>;
	rightContainer?: ReactNode;
};

const Header = ({
	title,
	rightContainer,
	leftTitle,
	leftTitleStyle,
	backIconColor = "white",
	style,
	intensity,
	canGoBack,
	...props
}: HeaderProps & ViewProps) => {
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();
	const { goBack } = useNavigation();
	const scheme = useColorScheme();

	return (
		<BlurView
			style={{
				paddingTop: insets.top,
				position: "absolute",
				top: 0,
				zIndex: 1000,
				width,
			}}
			intensity={intensity}
			tint={scheme === "dark" ? "dark" : "light"}
		>
			{/* header container  */}
			<View
				style={[
					{
						height: canGoBack
							? DIMENTIONS.CANGOBACK_HEADER_HEIGHT
							: DIMENTIONS.HEADER_HEIGHT,
						flexDirection: "row",
						alignItems: "center",
						paddingHorizontal: DIMENTIONS.APP_PADDING + 6,
						justifyContent: "space-between",
					},
					style,
				]}
				{...props}
			>
				{canGoBack ? (
					<CustomTouchableOpacity
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 5,
						}}
						onPress={goBack}
					>
						<Ionicons
							name="chevron-back"
							color={backIconColor}
							size={20}
						/>
						<Text
							style={[
								{
									color: "white",
									fontSize: 20,
									fontWeight: "400",
								},
								leftTitleStyle,
							]}
						>
							{leftTitle}
						</Text>
					</CustomTouchableOpacity>
				) : (
					<HeaderTitle>{title}</HeaderTitle>
				)}
				{rightContainer}
			</View>
		</BlurView>
	);
};

export default Header;
