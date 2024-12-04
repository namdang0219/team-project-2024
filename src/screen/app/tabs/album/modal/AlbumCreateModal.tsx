import {
	View,
	Text,
	Image,
	ScrollView,
	ImageBackground,
	Alert,
	TouchableWithoutFeedback,
	Dimensions,
	StyleSheet,
	Modal,
	TextInput,
	FlatList,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { DIMENTIONS } from "constant/dimention";
import { Feather, AntDesign } from "@expo/vector-icons";
import { CustomTouchableOpacity } from "components/custom";
import { Input } from "components/input";
import { Label } from "components/label";
import handlePressBackground from "util/func/handlePressBackground";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { IUser } from "types/IUser";
import { userMocks } from "mock/userMocks";
import { useItemWidth } from "hook/useItemWidth";
import { useToggle } from "hook/useToggle";
import AlbumTagFriendModal from "./AlbumTagFriendModal";

const { width } = Dimensions.get("screen");

const AlbumCreateModal = ({
	toggleCreateAlbumModal,
	image,
	setImage,
}: {
	toggleCreateAlbumModal: () => void;
	image: string;
	setImage: Dispatch<SetStateAction<string>>;
}) => {
	const insets = useSafeAreaInsets();
	const [taggedFriendId, setTaggedFriendId] = useState<number[]>([1]);
	const itemWidth = useItemWidth(10, 5);
	const [tagFriendModal, toggleTagFriendModal] = useToggle(false);

	const taggedFriend: IUser[] = userMocks.filter((u: IUser) =>
		taggedFriendId.includes(u.id)
	);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			// allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const onCancle = () => {
		Alert.alert("破壊？", "全ての内容が削除されます", [
			{
				text: "キャンセル",
				style: "cancel",
			},
			{
				text: "破壊",
				onPress: () => toggleCreateAlbumModal(),
				style: "destructive",
			},
		]);
	};

	const styles = StyleSheet.create({
		container: {
			paddingTop: insets.top,
			flex: 1,
		},
		headerContainer: {
			height: DIMENTIONS.HEADER_HEIGHT,
			paddingHorizontal: DIMENTIONS.APP_PADDING,
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "space-between",
		},
		headerTitle: {
			fontSize: 20,
			fontWeight: "500",
			width: width / 2,
			textAlign: "center",
		},
		image: {
			height: 560,
			marginTop: 5,
			position: "relative",
		},
		pickerIconContainer: {
			position: "absolute",
			bottom: 20,
			right: 20,
		},
		pickerIcon: {
			shadowOpacity: 0.3,
			shadowRadius: 8,
			elevation: 8,
		},
		contentContainer: {
			paddingHorizontal: DIMENTIONS.APP_PADDING,
			marginTop: 20,
			flex: 1,
			gap: 14,
		},
		addFriendItemContainer: {
			width: itemWidth,
			height: itemWidth,
			borderRadius: 1000,
			backgroundColor: "#f3f4f6",
			alignItems: "center",
			justifyContent: "center",
		},
	});

	const FriendItem = ({ user }: { user: IUser }) => {
		const handleUntagFriend = () => {
			const index = taggedFriendId.indexOf(user.id);
			if (index >= 0) {
				setTaggedFriendId(
					taggedFriendId.filter((id) => id !== user.id)
				);
			}
		};

		return (
			<View style={{ position: "relative" }}>
				<Image
					source={{
						uri: user.avatar,
					}}
					style={{
						width: itemWidth,
						height: itemWidth,
						aspectRatio: "1/1",
						borderRadius: 1000,
					}}
				/>
				<CustomTouchableOpacity
					onPress={handleUntagFriend}
					style={{
						position: "absolute",
						top: -2,
						right: -2,
						backgroundColor: "white",
						width: 20,
						aspectRatio: 1,
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 100,
						shadowOpacity: 0.08,
					}}
				>
					<Feather name="x" />
				</CustomTouchableOpacity>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{/* header  */}
			<View style={styles.headerContainer}>
				<CustomTouchableOpacity onPress={onCancle}>
					<Feather name="x" size={26} color={"red"} />
				</CustomTouchableOpacity>

				<Text style={styles.headerTitle}>アルバム作成</Text>

				<CustomTouchableOpacity onPress={toggleCreateAlbumModal}>
					<Feather name="check" size={26} color={"#00C261"} />
				</CustomTouchableOpacity>
			</View>

			{/* content  */}
			<TouchableWithoutFeedback onPress={handlePressBackground}>
				<ScrollView style={{ flex: 1 }}>
					<ImageBackground
						source={{
							uri: image,
						}}
						style={styles.image}
					>
						<CustomTouchableOpacity
							style={styles.pickerIconContainer}
							onPress={pickImage}
						>
							<Feather
								name="edit"
								size={30}
								color={"white"}
								style={styles.pickerIcon}
							/>
						</CustomTouchableOpacity>
					</ImageBackground>
					{/* input  */}
					<View style={styles.contentContainer}>
						<View>
							<Label>タイトル</Label>
							<Input placeholder="アルバムのタイトル" />
						</View>
						<View>
							<Label>説明</Label>
							<Input placeholder="アルバムの説明" />
						</View>
						<View>
							<Label>友達</Label>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									gap: 10,
								}}
							>
								{taggedFriend.map((item: IUser) => (
									<FriendItem key={item.id} user={item} />
								))}
								<CustomTouchableOpacity
									style={styles.addFriendItemContainer}
									onPress={toggleTagFriendModal}
								>
									<AntDesign
										name="plus"
										color={"#9ca3af"}
										size={30}
									/>
								</CustomTouchableOpacity>
							</View>
						</View>
					</View>

					<View style={{ height: 500 }}></View>
				</ScrollView>
			</TouchableWithoutFeedback>

			<Modal
				visible={tagFriendModal}
				animationType="slide"
				presentationStyle="formSheet"
			>
				<AlbumTagFriendModal
					toggleTagFriendModal={toggleTagFriendModal}
					taggedFriendId={taggedFriendId}
					setTaggedFriendId={setTaggedFriendId}
				/>
			</Modal>
		</View>
	);
};

export default AlbumCreateModal;
