import React, { useRef } from "react";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import SliderItem from "./SliderItem";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { Text } from "react-native";
import { IAlbum } from "types/IAlbum";
import { useTheme } from "@react-navigation/native";

const Slider = () => {
	const albums = useSelector((state: RootState) => state.album as IAlbum[]);
	const ref = useRef<any>();
	const progress = useSharedValue<number>(0);
	const { colors } = useTheme();

	const HEIGHT = 250;

	const { width } = Dimensions.get("window");

	const onPressPagination = (index: number) => {
		ref.current?.scrollTo({
			/**
			 * Calculate the difference between the current index and the target index
			 * to ensure that the carousel scrolls to the nearest index
			 */
			count: index - progress.value,
			animated: true,
		});
	};

	if (albums.length == 0) {
		return (
			<View
				style={{
					height: HEIGHT,
					backgroundColor: colors.input,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={{ color: colors.icon, fontSize: 16 }}>
					アルバムはまだありません
				</Text>
			</View>
		);
	}

	return (
		<View>
			<View style={{ height: HEIGHT }}>
				<Carousel
					autoPlay
					ref={ref}
					autoPlayInterval={3000}
					data={albums}
					height={HEIGHT}
					loop={true}
					pagingEnabled={true}
					snapEnabled={true}
					width={width}
					style={{
						width: width,
					}}
					scrollAnimationDuration={2000}
					mode="parallax"
					modeConfig={{
						parallaxScrollingScale: 0.9,
						parallaxScrollingOffset: 65,
						parallaxAdjacentItemScale: 0.72,
					}}
					onProgressChange={progress}
					renderItem={({ item }) => (
						<SliderItem item={item}></SliderItem>
					)}
				/>
			</View>

			{/* pagination  */}
			{/* <Pagination.Basic
				progress={progress}
				data={albums}
				size={7.5}
				dotStyle={{
					backgroundColor: "#ddd6fe",
					borderRadius: 1000,
				}}
				activeDotStyle={{
					overflow: "hidden",
					backgroundColor: "#8b5cf6",
				}}
				containerStyle={{
					gap: 8,
				}}
				horizontal
				onPress={onPressPagination}
			/> */}
		</View>
	);
};

export default Slider;
