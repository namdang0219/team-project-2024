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

const defaultDataWith6Colors = [
	"#B0604D",
	"#899F9C",
	"#B3C680",
	"#5C6265",
	"#F5D399",
	"#F1F1F1",
];

const Slider = () => {
	const ref = useRef<any>(null);
	const progress = useSharedValue<number>(0);

	const HEIGHT = 250;

	const data = new Array(5).fill(null);

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
					autoPlayInterval={2000}
					data={data}
					height={HEIGHT}
					loop={true}
					pagingEnabled={true}
					snapEnabled={true}
					width={width}
					style={{
						width: width,
					}}
					scrollAnimationDuration={850}
					mode="parallax"
					modeConfig={{
						parallaxScrollingScale: 0.9,
						parallaxScrollingOffset: 65,
						parallaxAdjacentItemScale: 0.72,
					}}
					onProgressChange={progress}
					renderItem={(info: {
						item: null;
						index: number;
						animationValue: SharedValue<number>;
					}) => (
						<SliderItem></SliderItem>
					)}
				/>
			</View>

			{/* pagination  */}
			<Pagination.Basic<{ color: string }>
				progress={progress}
				data={data}
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
