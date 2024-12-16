import {
	View,
	Text,
	FlatList,
	Image,
	RefreshControl,
	Alert,
} from "react-native";
import React, { useState } from "react";
import Header from "layout/Header";
import { DIMENTIONS } from "constant/dimention";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTouchableOpacity } from "components/custom";
import { useTheme } from "@react-navigation/native";
import { userMocks } from "mock/userMocks";
import { IUser } from "types/IUser";
import { INotification } from "types/INotification";
import { notificationMocks } from "mock/notificationMocks";
import { OptionModal } from "components/modal";
import { IOption } from "components/modal/OptionModal";
import { Feather } from "@expo/vector-icons";

const NotificationScreen = () => {
	const insets = useSafeAreaInsets();
	const { colors } = useTheme();
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

	const handleMarkAllAsReaded = () => {
		Alert.alert("全て既読にしますか？", "", [
			{ text: "いいえ", onPress: () => {}, style: "cancel" },
			{ text: "はい", onPress: () => null },
		]);
	};

	const options: IOption[] = [
		{
			label: "全て拝見したとマーク",
			icon: <Feather name="check-square" size={20} />,
			action: handleMarkAllAsReaded,
		},
	];

	const onRefresh = () => {
		setIsRefreshing(true);
		setTimeout(() => {
			setIsRefreshing(false);
		}, 2000);
	};

	const findNoticeUser = (userId: IUser["uid"]) => {
		const user: IUser | undefined = userMocks.find((u) => u.uid === userId);
		return user;
	};

	const renderNotificationContent = (item: INotification) => {
		switch (item.type) {
			case "NEW_POST":
				return `${
					findNoticeUser(item.noticeUser)?.displayName
				} さんが新しく投稿しました。すぐチェックして一緒に楽しみましょう！`;
			case "MENTION":
				return `${
					findNoticeUser(item.noticeUser)?.displayName
				} さんからメンションされました。さっそく確認に行きましょう！`;
			default:
				return null;
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Header
				title="通知"
				rightContainer={<OptionModal options={options}></OptionModal>}
			/>
			<FlatList
				data={notificationMocks.concat(notificationMocks)}
				keyExtractor={(_, index) => String(index)}
				contentContainerStyle={{
					paddingBottom: 120,
					paddingTop: insets.top + DIMENTIONS.HEADER_HEIGHT,
				}}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={onRefresh}
						progressViewOffset={
							insets.top + DIMENTIONS.HEADER_HEIGHT
						}
					/>
				}
				renderItem={({ item }) => (
					<CustomTouchableOpacity
						style={{
							paddingHorizontal: DIMENTIONS.APP_PADDING,
							flexDirection: "row",
							gap: 10,
							paddingVertical: 10,
						}}
					>
						<Image
							source={{
								uri: findNoticeUser(item.noticeUser)?.photoURL,
							}}
							style={{
								width: 64,
								aspectRatio: 1,
								borderRadius: 10000,
							}}
						/>
						<View style={{ flex: 1 }}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 6,
								}}
							>
								<Text
									style={{
										fontSize: 16,
										fontWeight: "600",
									}}
								>
									{
										findNoticeUser(item.noticeUser)
											?.displayName
									}
								</Text>
								{!item.isChecked && (
									<View
										style={{
											width: 6.5,
											aspectRatio: 1,
											borderRadius: 1000,
											backgroundColor: colors.primary,
										}}
									/>
								)}
							</View>
							<Text
								style={{
									fontWeight: "400",
									lineHeight: 24,
									marginTop: 2,
								}}
								numberOfLines={2}
							>
								{renderNotificationContent(item)}
							</Text>

							<Text
								style={{
									marginTop: 6,
									fontSize: 12,
									color: colors.subGray,
								}}
							>
								1時間前
							</Text>
						</View>
					</CustomTouchableOpacity>
				)}
			/>
		</View>
	);
};

export default NotificationScreen;
