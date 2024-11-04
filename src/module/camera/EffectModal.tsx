import {
	View,
	Text,
	Modal,
	Pressable,
	Image,
	FlatList,
	useWindowDimensions,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { BlurView } from "expo-blur";
import {
	Route,
	SceneMap,
	TabBar,
	TabBarProps,
	TabView,
} from "react-native-tab-view";

type EffectModalProps = {
	showEffectModal: boolean;
	setShowEffectModal: Dispatch<SetStateAction<boolean>>;
};

const EffectModal = ({
	showEffectModal,
	setShowEffectModal,
}: EffectModalProps) => {
	const { width } = useWindowDimensions();
	return (
		<Modal
			transparent={true}
			visible={showEffectModal}
			animationType="slide"
			onRequestClose={() => setShowEffectModal(false)}
		>
			<View style={{ flex: 1, backgroundColor: "transparent" }}>
				{/* backdrop  */}
				<Pressable
					style={{ flex: 1 }}
					onPress={() => setShowEffectModal(false)}
				/>

				<BlurView
					tint="dark"
					style={{
						overflow: "hidden",
						height: width,
						borderTopLeftRadius: 15,
						borderTopRightRadius: 15,
						backgroundColor: "rgba(0,0,0,0.2)",
					}}
				>
					<EffectModalContent />
				</BlurView>
			</View>
		</Modal>
	);
};

const EffectModalContent = () => {
	const layout = useWindowDimensions();

	const padding = 10;

	const gap = 10;
	const numColumns = 4;

	const availableSpace = layout.width - (numColumns - 1) * gap - padding * 2;
	const itemSize = availableSpace / numColumns;

	const FirstRoute = () => {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: "transparent",
					paddingHorizontal: padding,
				}}
			>
				<FlatList
					data={new Array(18).fill(0)}
					keyExtractor={(item, index) => index.toString()}
					numColumns={numColumns}
					contentContainerStyle={{ gap, paddingTop: padding }}
					columnWrapperStyle={{ gap }}
					renderItem={({ item, index }) => (
						<View key={index}>
							<Image
								source={{
									uri: "https://i.pinimg.com/736x/bc/b4/b8/bcb4b89ed0a80184c54db62d0a5cf179.jpg",
								}}
								style={{ width: itemSize, aspectRatio: "1/1" }}
							></Image>
						</View>
					)}
				/>
			</View>
		);
	};

	const SecondRoute = () => {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: "transparent",
					paddingHorizontal: padding,
				}}
			>
				<FlatList
					data={new Array(18).fill(0)}
					keyExtractor={(item, index) => index.toString()}
					numColumns={numColumns}
					contentContainerStyle={{ gap, paddingTop: padding }}
					columnWrapperStyle={{ gap }}
					renderItem={({ item, index }) => (
						<View key={index}>
							<Image
								source={{
									uri: "https://i.pinimg.com/originals/03/9f/54/039f546ad4bd2a52ea4da370035e5b73.gif",
								}}
								style={{
									width: itemSize,
									aspectRatio: "1/1",
									objectFit: "cover",
								}}
							></Image>
						</View>
					)}
				/>
			</View>
		);
	};

	const renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
	});

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: "first", title: "保存済み" },
		{ key: "second", title: "流行中" },
	]);

	const renderTabBar = (props: TabBarProps<Route>) => (
		<TabBar
			{...props}
			indicatorStyle={{
				backgroundColor: "white",
				height: 2,
			}}
			contentContainerStyle={{
				borderBottomColor: "#d3d3d3",
				borderBottomWidth: 0.5,
			}}
			tabStyle={{ width: 90 }}
			labelStyle={{
				fontSize: 16,
				fontWeight: "500",
				color: "white",
			}}
			renderLabel={({ route, focused, color }) => (
				<Text
					style={{ color: "white", fontSize: 15, fontWeight: "500" }}
				>
					{route.title}
				</Text>
			)}
			style={{
				backgroundColor: "transparent",
				elevation: 0,
				shadowOpacity: 0,
			}}
		/>
	);

	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			renderTabBar={renderTabBar}
		/>
	);
};

export default EffectModal;
