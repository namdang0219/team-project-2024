import { View, Text, SafeAreaView, StatusBar, Dimensions } from "react-native";
import React from "react";
import Gallery from "react-native-awesome-gallery";
import { Button } from "components/button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { imageMocks } from "mock/imageMocks";
import { IImage } from "types/IImage";
import { DIMENTIONS } from "constant/dimention";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomTouchableOpacity } from "components/custom";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { OptionModal } from "components/modal";

const { width } = Dimensions.get("screen");

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const ImageViewScreen = () => {
	const { goBack } = useNavigation();
	const { params } = useRoute<any>();
	const imageIds = params?.imageIds;
	const insets = useSafeAreaInsets();

	const imageData = imageMocks.filter((i: IImage) =>
		imageIds.includes(i.iid)
	);

	return (
		<>
			<StatusBar barStyle={"light-content"} />
			<View style={{ flex: 1, position: "relative" }}>
				<AnimatedBlurView
					intensity={20}
					style={{
						position: "absolute",
						paddingTop: insets.top,
						width,
						top: 0,
						left: 0,
						zIndex: 1000,
					}}
					entering={FadeInUp.duration(600).delay(200)}
				>
					<Animated.View
						style={{
							height: DIMENTIONS.HEADER_HEIGHT,
							paddingHorizontal: DIMENTIONS.APP_PADDING,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
                            opacity: 0.75
						}}
					>
						{/* left container  */}
						<CustomTouchableOpacity onPress={() => goBack()}>
							<Feather name="x" size={24} color={"white"} />
						</CustomTouchableOpacity>

						{/* right container  */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 20,
							}}
						>
							<CustomTouchableOpacity>
								<Feather
									name="edit"
									size={22}
									color={"white"}
								/>
							</CustomTouchableOpacity>
							<CustomTouchableOpacity>
								<MaterialCommunityIcons
									name="tag-outline"
									size={24}
									color={"white"}
								/>
							</CustomTouchableOpacity>
							<OptionModal
								options={[
									{
										label: "写真を削除",
										action: () => null,
										icon: <Ionicons name="trash-outline" size={20} />,
									},
								]}
								iconStyle={{ color: "white" }}
							/>
						</View>
					</Animated.View>
				</AnimatedBlurView>
				<Gallery
					data={imageData.map((i) => i.uri)}
					onSwipeToClose={() => console.log("close")}
					onIndexChange={(newIndex) => {
						console.log(newIndex);
					}}
				/>
			</View>
		</>
	);
};

export default ImageViewScreen;
