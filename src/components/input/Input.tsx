import { Text, TextInput, TextInputProps, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import Svg, { G, Path } from "react-native-svg";
import { CustomTouchableOpacity } from "components/custom";
import { DIMENTIONS } from "constant/dimention";

type Input = { errorMessage?: string | undefined };

const Input = ({
	placeholder = "",
	errorMessage = "",
	secureTextEntry = false,
	...props
}: TextInputProps & Input) => {
	const { colors } = useTheme();
	const [showPassword, setShowPassword] = useState<boolean>(true);

	return (
		<View style={{ position: "relative" }}>
			<TextInput
				placeholder={placeholder}
				style={{
					padding: 16,
					borderWidth: 1,
					borderColor: colors.primary,
					borderRadius: DIMENTIONS.AUTH_INPUT_BORDER_RADIUS,
					color: colors.text,
				}}
				secureTextEntry={
					secureTextEntry == true ? showPassword : secureTextEntry
				}
				autoCapitalize="none"
				autoComplete="off"
				autoCorrect={false}
				autoFocus={false}
				{...props}
			/>
			{errorMessage && (
				<Text
					style={{
						position: "absolute",
						bottom: -20,
						left: 16,
						color: colors.error,
					}}
				>
					{errorMessage}
				</Text>
			)}
			{secureTextEntry && (
				<CustomTouchableOpacity
					onPress={() => setShowPassword(!showPassword)}
					style={{ position: "absolute", right: 18, top: 12 }}
				>
					{showPassword ? <IconEyeOff /> : <IconEyeOn />}
				</CustomTouchableOpacity>
			)}
		</View>
	);
};

const IconEyeOff = () => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24">
			<G fill="none" stroke="gray" strokeLinecap="round" strokeWidth={2}>
				<Path
					strokeLinejoin="round"
					d="M10.73 5.073A11 11 0 0 1 12 5c4.664 0 8.4 2.903 10 7a11.6 11.6 0 0 1-1.555 2.788M6.52 6.519C4.48 7.764 2.9 9.693 2 12c1.6 4.097 5.336 7 10 7a10.44 10.44 0 0 0 5.48-1.52m-7.6-7.6a3 3 0 1 0 4.243 4.243"
				></Path>
				<Path d="m4 4l16 16"></Path>
			</G>
		</Svg>
	);
};

const IconEyeOn = () => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24">
			<G
				fill="none"
				stroke="gray"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			>
				<Path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></Path>
				<Path d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7"></Path>
			</G>
		</Svg>
	);
};

export default Input;
