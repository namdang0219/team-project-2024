import {
	View,
	Text,
	SafeAreaView,
	useWindowDimensions,
	Image,
	StyleSheet,
} from "react-native";
import React from "react";
import { darkTheme } from "util/theme/themeColors";
import { IconBack } from "icon/global";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { useNavigation } from "@react-navigation/native";
import { Button } from "components/button";
import { Feather } from "@expo/vector-icons";
import Svg, {
	G,
	Rect,
	Path,
	Defs,
	RadialGradient,
	Stop,
} from "react-native-svg";
const SavePhotoScreen = ({ route }: { route: any }) => {
	const { photoUri } = route.params;
	const { width: screenWidth } = useWindowDimensions();
	const { goBack, navigate } = useNavigation<any>();

	const styles = StyleSheet.create({
		topbar: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: 15,
			marginHorizontal: 14,
		},
		mainContainer: {
			paddingHorizontal: DIMENTIONS.AUTH_PADDING,
			justifyContent: "space-between",
			flex: 1,
		},
		imageContainer: {
			width: (screenWidth / 5) * 4,
			aspectRatio: "1/1",
			marginHorizontal: "auto",
			alignItems: "center",
			justifyContent: "center",
		},
		image: {
			width: "100%",
			height: "100%",
			objectFit: "contain",
		},
		buttonContent: {
			flexDirection: "row",
			alignItems: "center",
			gap: 20,
		},
		buttonText: {
			color: "white",
			fontSize: 16,
			fontWeight: "500",
		},
		methodContainer: {
			borderWidth: 1,
			borderColor: "#E1E1E1",
			borderRadius: 8,
			position: "relative",
			height: 50,
			alignItems: "center",
			justifyContent: "center",
		},
		methodIcon: {
			position: "absolute",
			left: 10,
			top: 10,
			opacity: 0.9,
		},
		methodText: {
			color: "white",
			fontSize: 16,
			textAlign: "center",
		},
	});

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: darkTheme.colors.background }}
		>
			<View style={styles.topbar}>
				<CustomTouchableOpacity onPress={goBack}>
					<IconBack />
				</CustomTouchableOpacity>
			</View>

			{/* main container  */}
			<View style={styles.mainContainer}>
				<View>
					<View style={styles.imageContainer}>
						{photoUri ? (
							<Image
								source={{
									uri: photoUri,
								}}
								style={styles.image}
							/>
						) : (
							<Text>写真がありません</Text>
						)}
					</View>

					{/* share method  */}
					<View style={{ gap: 16, marginTop: 25 }}>
						{/* insta  */}
						<CustomTouchableOpacity style={styles.methodContainer}>
							<View style={styles.methodIcon}>
								<IconInsta />
							</View>
							<Text style={styles.methodText}>
								Instagramに共有
							</Text>
						</CustomTouchableOpacity>
						{/* facebook  */}
						<CustomTouchableOpacity style={styles.methodContainer}>
							<View style={styles.methodIcon}>
								<IconFacebook />
							</View>
							<Text style={styles.methodText}>
								Facebookに共有
							</Text>
						</CustomTouchableOpacity>
						{/* facebook  */}
						<CustomTouchableOpacity style={styles.methodContainer}>
							<View style={styles.methodIcon}>
								<IconShare />
							</View>
							<Text style={styles.methodText}>
								Facebookに共有
							</Text>
						</CustomTouchableOpacity>
					</View>
				</View>

				<View>
					{/* add to album button   */}
					<CustomTouchableOpacity
						style={{ marginHorizontal: "auto" }}
					>
						<Text style={{ color: "white", fontSize: 16 }}>
							アルバムに追加
						</Text>
					</CustomTouchableOpacity>

					{/* download button  */}
					<Button
						style={{ marginTop: 16 }}
						onPress={() =>
							navigate("AlbumStack", { screen: "AlbumScreen" })
						}
					>
						<View style={styles.buttonContent}>
							<Feather
								name="download"
								color="white"
								size={20}
								style={{ position: "absolute", left: -90 }}
							/>
							<Text style={styles.buttonText}>
								デバイスに保存
							</Text>
						</View>
					</Button>
				</View>
			</View>
		</SafeAreaView>
	);
};

const IconInsta = () => {
	return (
		<Svg width={28} height={28} viewBox="0 0 256 256">
			<G fill="none">
				<Rect
					width={256}
					height={256}
					fill="url(#skillIconsInstagram0)"
					rx={60}
				></Rect>
				<Rect
					width={256}
					height={256}
					fill="url(#skillIconsInstagram1)"
					rx={60}
				></Rect>
				<Path
					fill="#fff"
					d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355s22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334s-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334"
				></Path>
				<Defs>
					<RadialGradient
						id="skillIconsInstagram0"
						cx={0}
						cy={0}
						r={1}
						gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#fd5"></Stop>
						<Stop offset={0.1} stopColor="#fd5"></Stop>
						<Stop offset={0.5} stopColor="#ff543e"></Stop>
						<Stop offset={1} stopColor="#c837ab"></Stop>
					</RadialGradient>
					<RadialGradient
						id="skillIconsInstagram1"
						cx={0}
						cy={0}
						r={1}
						gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#3771c8"></Stop>
						<Stop offset={0.128} stopColor="#3771c8"></Stop>
						<Stop
							offset={1}
							stopColor="#60f"
							stopOpacity={0}
						></Stop>
					</RadialGradient>
				</Defs>
			</G>
		</Svg>
	);
};

const IconFacebook = () => {
	return (
		<Svg width={28} height={28} viewBox="0 0 256 256">
			<Path
				fill="#1877f2"
				d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
			></Path>
			<Path
				fill="#fff"
				d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
			></Path>
		</Svg>
	);
};

const IconShare = () => {
	return (
		<Svg width={28} height={28} viewBox="0 0 24 24">
			<Path
				fill="white"
				fillRule="evenodd"
				d="M14.839 14.92a3 3 0 1 1-.8 1.599l-4.873-2.443a3 3 0 1 1 0-4.151l4.873-2.443a3 3 0 1 1 .8 1.599l-4.877 2.438a3 3 0 0 1 0 .962zM17 8a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 10a1 1 0 1 0 0-2a1 1 0 0 0 0 2M7 13a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
			></Path>
		</Svg>
	);
};

export default SavePhotoScreen;