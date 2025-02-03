import {
	View,
	SafeAreaView,
	Image,
	useWindowDimensions,
	Animated as ReactAnimated,
	StyleSheet,
	Text,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ThemedText } from "components/themed";
import { CustomTouchableOpacity } from "components/custom";
import { Button } from "components/button";
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";

export default function IntroduceScreen() {
	const { navigate } = useNavigation<any>();
	const { colors } = useTheme();
	const [currentIndex, setCurrentIndex] = useState(0);
	const { width } = useWindowDimensions();
	const scrollX = useRef(new ReactAnimated.Value(0)).current;
	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
	const slidesRef = useRef(null);
	const offsetX = useSharedValue(0);

	const animatedOpacityStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			offsetX.value,
			[width * 1 + width / 2, width * 2], // Scroll range
			[0, 1] // Opacity range
		);

		return {
			opacity,
		};
	});

	const viewableItemsChange = useRef(
		({ viewableItems }: { viewableItems: any }) => {
			if (viewableItems.length > 0) {
				setCurrentIndex(viewableItems[0].index);
			}
		}
	).current;

	const [homeDatas] = useState([
		{
			key: "1",
			title: "ネコパンマン は何？",
			desc: "プロ写真加工アプリで、ステッカーやアイコンなどで写真もっと楽しく",
			img: require("./../../../assets/img/overview1.png"),
		},
		{
			key: "2",
			title: "友達と楽しもう",
			desc: "写真を一緒に編集できる、コミュニティーにシェア！",
			img: require("./../../../assets/img/overview2.png"),
		},
		{
			key: "3",
			title: "アニメ化して面白い！",
			desc: "簡単でアニメ化できて、新しい体験へ",
			img: require("./../../../assets/img/overview3.png"),
		},
	]);

	const styles = StyleSheet.create({
		title: {
			fontSize: 32,
			textAlign: "center",
		},
		desc: {
			fontSize: 16,
			textAlign: "center",
			paddingHorizontal: 50,
			color: "#000",
			lineHeight: 30,
			letterSpacing: 1,
		},
		pagination: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			marginTop: 30,
		},
		dot: {
			height: 10,
			width: 10,
			borderRadius: 5,
			marginHorizontal: 5,
		},
		dotActive: {
			backgroundColor: colors.primary,
		},
		dotInactive: {
			backgroundColor: "black",
			opacity: 0.2,
		},
	});

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
			<View style={{ marginTop: 40 }}>
				<Animated.FlatList
					onScroll={({ nativeEvent }) => {
						ReactAnimated.event(
							[
								{
									nativeEvent: {
										contentOffset: { x: scrollX },
									},
								},
							],
							{ useNativeDriver: false }
						);
						scrollX.setValue(nativeEvent.contentOffset.x);
						offsetX.value = nativeEvent.contentOffset.x;
					}}
					viewabilityConfig={viewConfig}
					ref={slidesRef}
					data={homeDatas}
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					bounces={false}
					horizontal
					onViewableItemsChanged={viewableItemsChange}
					keyExtractor={(item) => item.key}
					renderItem={({ item, index }) => (
						<View style={{ width: width }}>
							<Image
								source={item.img}
								style={{ width: width, height: width }}
							/>
							<View style={{ gap: 15 }}>
								<Text style={styles.title}>{item.title}</Text>
								<Text style={styles.desc}>{item.desc}</Text>
							</View>
						</View>
					)}
				/>
				<View style={styles.pagination}>
					{homeDatas.map((_, i) => (
						<View
							key={i}
							style={[
								styles.dot,
								i === currentIndex
									? styles.dotActive
									: styles.dotInactive,
							]}
						/>
					))}
				</View>
			</View>

			{/* button container  */}
			<Animated.View style={[{ marginBottom: 20 }, animatedOpacityStyle]}>
				<Button
					style={{
						height: 60,
						width: 240,
						marginHorizontal: "auto",
					}}
					onPress={() => navigate("SignupScreen")}
				>
					新規登録
				</Button>
				<CustomTouchableOpacity
					style={{ marginTop: 18 }}
					onPress={() => navigate("LoginScreen")}
				>
					<ThemedText
						style={{
							fontSize: 18,
							fontWeight: "500",
							textAlign: "center",
						}}
					>
						ログイン
					</ThemedText>
				</CustomTouchableOpacity>
			</Animated.View>
		</SafeAreaView>
	);
}
