import {
	Animated,
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	Directions,
	FlingGestureHandler,
	State,
} from "react-native-gesture-handler";
import Header from "layout/Header";
import { DIMENTIONS } from "constant/dimention";

const width = Dimensions.get("window").width;

const DATA = [
	{
		title: "Flanklin",
		location: "Mumbai",
		data: "1/1/1",
		poster: "https://i.pinimg.com/736x/6a/dd/d0/6addd0f05589445c3a97bd13b1c3330a.jpg",
	},
	{
		title: "Flanklin2",
		location: "Mumbai",
		data: "2/2/2",
		poster: "https://i.pinimg.com/736x/5e/22/7f/5e227fc418f1a78380e4d7df2a3160bd.jpg",
	},
	{
		title: "Flanklin3",
		location: "Mumbai",
		data: "3/3/3",
		poster: "https://i.pinimg.com/736x/ca/8c/c4/ca8cc41afe3b03d68f310077828dc659.jpg",
	},
	{
		title: "Flanklin4",
		location: "Mumbai",
		data: "4/4/4",
		poster: "https://i.pinimg.com/736x/51/e2/54/51e254e3a8812cc279594ef16d11adb0.jpg",
	},
];

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.85;
const ITEM_HEIGHT = (ITEM_WIDTH / 9) * 16;
const VISIBLE_ITEM = 3;

const OverFlowItems = ({ data }: { data: any }) => {
	return (
		<View style={styles.overFlowContainer}>
			<View>
				{data.map((item: any, index: number) => {
					return (
						<View key={index} style={[styles.itemContainer]}>
							<Text style={[styles.title]} numberOfLines={1}>
								{item.title}
							</Text>
							<View style={styles.itemContainerRow}>
								<Text style={[styles.location]}>
									{item.location}
								</Text>
							</View>
						</View>
					);
				})}
			</View>
		</View>
	);
};

const AlbumDetailScreen = () => {
	const [data, setData] = useState(DATA);
	const scrollXIndex = useRef(new Animated.Value(0)).current;
	const scrollXAnimated = useRef(new Animated.Value(0)).current;
	const indexRef = useRef(0);
	const setActiveIndex = useCallback((activeIndex: number) => {
		indexRef.current = activeIndex;
		scrollXIndex.setValue(activeIndex);
	}, []);

	useEffect(() => {
		Animated.spring(scrollXAnimated, {
			toValue: scrollXIndex,
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<FlingGestureHandler
			key="left"
			direction={Directions.LEFT}
			onHandlerStateChange={(event) => {
				if (event.nativeEvent.state === State.END) {
					if (indexRef.current === data.length - 1) {
						return;
					}
					setActiveIndex(indexRef.current + 1);
				}
			}}
		>
			<FlingGestureHandler
				key="right"
				direction={Directions.RIGHT}
				onHandlerStateChange={(event) => {
					if (event.nativeEvent.state === State.END) {
						if (indexRef.current === 0) {
							return;
						}
						setActiveIndex(indexRef.current - 1);
					}
				}}
			>
				<View style={styles.container}>
					<Header title="Album Screen" />
					<View style={{ height: DIMENTIONS.HEADER_HEIGHT + 60 }} />
					<FlatList
						data={data}
						keyExtractor={(_, index) => String(index)}
						horizontal
						inverted
						contentContainerStyle={{
							flex: 1,
							justifyContent: "center",
							padding: SPACING * 2,
						}}
						scrollEnabled={false}
						removeClippedSubviews={false}
						CellRendererComponent={({
							item,
							index,
							children,
							style,
							...props
						}) => {
							const newStyle = [
								style,
								{ zIndex: data.length - index },
							];
							return (
								<View style={newStyle} {...props}>
									{children}
								</View>
							);
						}}
						renderItem={({ item, index }) => {
							const inputRange = [index - 1, index, index + 1];
							const translateX = scrollXAnimated.interpolate({
								inputRange,
								outputRange: [50, 0, -100],
							});
							const scale = scrollXAnimated.interpolate({
								inputRange,
								outputRange: [0.8, 1, 1.3],
							});
							const opacity = scrollXAnimated.interpolate({
								inputRange,
								outputRange: [1 - 1 / VISIBLE_ITEM, 1, 0],
							});
							return (
								<Animated.View
									key={index}
									style={{
										position: "absolute",
										left: -ITEM_WIDTH / 2,
										transform: [{ translateX }, { scale }],
										opacity,
									}}
								>
									<Image
										source={{ uri: item.poster }}
										style={{
											width: ITEM_WIDTH,
											height: ITEM_HEIGHT,
										}}
									/>
								</Animated.View>
							);
						}}
					/>
				</View>
			</FlingGestureHandler>
		</FlingGestureHandler>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", backgroundColor: "white" },
	overFlowContainer: {
		height: OVERFLOW_HEIGHT,
		overflow: "hidden",
	},
	itemContainer: {
		height: OVERFLOW_HEIGHT,
		padding: SPACING,
	},
	title: { fontSize: 28 },
	itemContainerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	location: { fontSize: 16 },
});

export default AlbumDetailScreen;
