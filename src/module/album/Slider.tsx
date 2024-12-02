import React, { useRef } from "react";
import {
	Dimensions,
	Image,
	ImageBackground,
	ScaledSize,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	Extrapolation,
	interpolate,
	SharedValue,
	useSharedValue,
} from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import SliderItem from "./SliderItem";
import { albumMocks } from "mock/albumMocks";

const defaultDataWith6Colors = [
	"#B0604D",
	"#899F9C",
	"#B3C680",
	"#5C6265",
	"#F5D399",
	"#F1F1F1",
];

const Slider = () => {
	const ref = useRef<any>();
	const progress = useSharedValue<number>(0);

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

	return (
		<View>
			<View style={{ height: HEIGHT }}>
				<Carousel
					autoPlay
					ref={ref}
					autoPlayInterval={3000}
					data={albumMocks}
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
					renderItem={({item}) => (
						<SliderItem item={item}></SliderItem>
					)}
				/>
			</View>

			{/* pagination  */}
			<Pagination.Basic
				progress={progress}
				data={albumMocks}
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
			/>
		</View>
	);
};

export default Slider;
