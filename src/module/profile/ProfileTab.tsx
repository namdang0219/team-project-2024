import { Image, useWindowDimensions, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { DIMENTIONS } from "constant/dimention";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";
import ProfileHeader from "./ProfileHeader";

const ProfileTab = () => {
	const { colors } = useTheme();
	const { width } = useWindowDimensions();

	return (
		<Tabs.Container
			renderHeader={ProfileHeader}
			headerContainerStyle={{ shadowOpacity: 0.1 }}
			renderTabBar={(props) => (
				<MaterialTabBar
					{...props}
					indicatorStyle={{
						backgroundColor: colors.primary,
					}}
					activeColor={colors.primary}
				/>
			)}
		>
			<Tabs.Tab name="posts" label="投稿">
				<Tabs.FlatList
					data={new Array(20).fill(null)}
					columnWrapperStyle={{ gap: 5 }}
					contentContainerStyle={{
						paddingTop: 10,
						gap: 5,
						paddingHorizontal: 5,
					}}
					numColumns={4}
					renderItem={({ item, index }) => {
						return (
							<View key={index}>
								<Image
									source={{
										uri: "https://i.pinimg.com/564x/7b/6a/dc/7b6adc7c192632eb9e0cd71fad1415ca.jpg",
									}}
									style={{
										width: (width - 5 * 2 - 3 * 5) / 4,
										aspectRatio: "1/1",
										borderRadius: 4,
									}}
								/>
							</View>
						);
					}}
				/>
			</Tabs.Tab>

			<Tabs.Tab name="tags" label="タグ">
				<Tabs.FlatList
					data={new Array(10).fill(null)}
					columnWrapperStyle={{ gap: 5 }}
					contentContainerStyle={{
						paddingTop: 16,
						gap: 5,
						paddingHorizontal: DIMENTIONS.APP_PADDING,
					}}
					numColumns={4}
					renderItem={({ item, index }) => {
						return (
							<View key={index}>
								<Image
									source={{
										uri: "https://i.pinimg.com/736x/85/c6/e0/85c6e08b42d8567b5065ec37e6c315f4.jpg",
									}}
									style={{
										width:
											(width -
												DIMENTIONS.APP_PADDING * 2 -
												3 * 5) /
											4,
										aspectRatio: "1/1",
										borderRadius: 4,
									}}
								/>
							</View>
						);
					}}
				/>
			</Tabs.Tab>
		</Tabs.Container>
	);
};

export default ProfileTab;
