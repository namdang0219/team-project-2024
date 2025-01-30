import {
	View,
	Text,
	Image,
	Dimensions,
	Modal,
	TextInput,
	StyleSheet,
	FlatList,
	TouchableWithoutFeedback,
	useWindowDimensions,
} from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DIMENTIONS } from "constant/dimention";
import { CustomTouchableOpacity } from "components/custom";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ThemedText } from "components/themed";
import { useAuth } from "context/auth-context";
import { debounce } from "lodash";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	Query,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { IUser } from "types/IUser";
import { Button } from "components/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Skeleton } from "components/skeleton";

const width = Dimensions.get("screen").width;

interface IFriendItem {
	uid: string;
	photoURL: string;
	displayName: string;
}

const WithFriend = () => {
	const { colors } = useTheme();
	const { navigate } = useNavigation<any>();
	const { remoteUserData, currentUser } = useAuth();
	const [friendModalOpen, setFriendModalOpen] = useState(false);

	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					paddingHorizontal: DIMENTIONS.APP_PADDING,
				}}
			>
				<ThemedText style={{ fontSize: 18, fontWeight: "600" }}>
					友達と
				</ThemedText>
				<CustomTouchableOpacity
					onPress={() =>
						navigate("GlobalStack", {
							screen: "FriendListScreen",
						})
					}
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 4,
					}}
				>
					<Text style={{ color: colors.primary }}>すべて</Text>
					<Entypo
						name="chevron-thin-right"
						size={14}
						color={colors.primary}
					/>
				</CustomTouchableOpacity>
			</View>
			<View
				style={{
					flexDirection: "row",
					marginTop: 12,
					paddingHorizontal: DIMENTIONS.APP_PADDING,
					gap: 10,
				}}
			>
				{remoteUserData?.friends.length &&
				remoteUserData.friends.length > 0 ? (
					remoteUserData?.friends
						.slice(0, 4)
						.map((item, index) => <FriendedItem uid={item} />)
				) : (
					<CustomTouchableOpacity
						onPress={() => setFriendModalOpen(true)}
						style={{
							width:
								(width - DIMENTIONS.APP_PADDING * 2 - 10 * 3) /
								4,
							aspectRatio: "1/1",
							borderRadius: 1000,
							backgroundColor: colors.input,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<AntDesign name="plus" color={colors.icon} size={26} />
					</CustomTouchableOpacity>
				)}
			</View>

			{/* add friend modal  */}
			<Modal
				visible={friendModalOpen}
				animationType="slide"
				presentationStyle="formSheet"
				onRequestClose={() => setFriendModalOpen(false)}
			>
				<FindFriendModal
					setFriendModalOpen={setFriendModalOpen}
				></FindFriendModal>
			</Modal>
		</View>
	);
};

const FindFriendModal = ({
	setFriendModalOpen,
}: {
	setFriendModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const [friendInput, setFriendInput] = useState<string>("");
	const [friendList, setFriendList] = useState<IFriendItem[]>([]);
	const { remoteUserData } = useAuth();
	const insets = useSafeAreaInsets();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		async function getUserLogic(q: Query) {
			const friends: IFriendItem[] = [];
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				friends.push({
					uid: doc.data().uid,
					photoURL: doc.data().photoURL,
					displayName: doc.data().displayName,
				});
			});
			setFriendList(friends);
		}

		async function getUsers() {
			setLoading(true);
			try {
				if (!friendInput) {
					const q = query(
						collection(db, "0_users"),
						limit(10),
						where("uid", "!=", remoteUserData?.uid)
					);
					getUserLogic(q);
				} else {
					const q = query(
						collection(db, "0_users"),
						limit(10),
						where("uid", "!=", remoteUserData?.uid),
						where("displayName", "==", friendInput)
					);
					getUserLogic(q);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
		getUsers();
	}, [friendInput]);

	return (
		<View
			style={{
				paddingHorizontal: DIMENTIONS.APP_PADDING,
				flex: 1,
				paddingBottom: insets.bottom,
			}}
		>
			<View style={styles.searchContainer}>
				<TextInput
					placeholder="友達を検索"
					placeholderTextColor={"#9ca3af"}
					style={styles.textInput}
					onChangeText={(e) => setFriendInput(e)}
				/>
				<Feather name="search" size={20} style={styles.searchIcon} />
			</View>
			<View style={styles.contentContainer}>
				{loading ? (
					<View style={{ flex: 1, marginTop: 6, gap: 10 }}>
						<View
							style={{
								flexDirection: "row",
								gap: 10,
								alignItems: "center",
							}}
						>
							<Skeleton width={50} height={50} rounded={1000} />
							<Skeleton width={60} height={20} />
						</View>
						<View
							style={{
								flexDirection: "row",
								gap: 10,
								alignItems: "center",
							}}
						>
							<Skeleton width={50} height={50} rounded={1000} />
							<Skeleton width={60} height={20} />
						</View>
						<View
							style={{
								flexDirection: "row",
								gap: 10,
								alignItems: "center",
							}}
						>
							<Skeleton width={50} height={50} rounded={1000} />
							<Skeleton width={60} height={20} />
						</View>
					</View>
				) : (
					<FlatList
						data={friendList.filter((item) =>
							item.displayName
								.toLowerCase()
								.includes(friendInput.toLowerCase())
						)}
						contentContainerStyle={{ flex: 1 }}
						keyExtractor={(item) => String(item.uid)}
						renderItem={({ item, index }) => (
							<FriendItem item={item}></FriendItem>
						)}
					/>
				)}

				<Button onPress={() => setFriendModalOpen(false)}>完了</Button>
			</View>
		</View>
	);
};

const FriendedItem = ({ uid }: { uid: string }) => {
	const { navigate } = useNavigation<any>();
	const [friendInfo, setFriendInfo] = useState<IUser | null>(null);

	useEffect(() => {
		async function getFriendInfo() {
			try {
				const docRef = doc(db, "0_users", uid);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					setFriendInfo(docSnap.data() as IUser);
				} else {
					console.log("No such document!");
				}
			} catch (error) {
				console.log(error);
			}
		}
		getFriendInfo();
	}, []);

	if (!friendInfo) return null;

	return (
		<CustomTouchableOpacity
			onPress={() =>
				navigate("GlobalStack", {
					screen: "AlbumWithFriendScreen",
					params: { userId: uid },
				})
			}
		>
			<Image
				source={{
					uri: friendInfo.photoURL as string,
				}}
				style={{
					width: (width - DIMENTIONS.APP_PADDING * 2 - 10 * 3) / 4,
					aspectRatio: "1/1",
					borderRadius: 1000,
				}}
			/>
			<ThemedText
				style={{
					textAlign: "center",
					fontSize: 12,
					marginTop: 8,
				}}
				numberOfLines={1}
			>
				{friendInfo.displayName}
			</ThemedText>
		</CustomTouchableOpacity>
	);
};

const styles = StyleSheet.create({
	searchContainer: {
		marginTop: 20,
		position: "relative",
	},
	textInput: {
		backgroundColor: "rgba(0,0,0,0.05)",
		height: 35,
		paddingHorizontal: 14,
		borderRadius: 6,
		color: "black",
	},
	searchIcon: {
		position: "absolute",
		right: 10,
		top: 7,
		color: "gray",
	},
	contentContainer: {
		paddingVertical: 5,
		flexGrow: 1,
		flex: 1,
	},
});

const FriendItem = ({ item }: { item: IFriendItem }) => {
	const { remoteUserData } = useAuth();
	const { colors } = useTheme();

	function checkFriend() {
		return remoteUserData?.friends.includes(item.uid);
	}

	return (
		<TouchableWithoutFeedback>
			<View
				style={{
					paddingVertical: 5,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 10,
					}}
				>
					<Image
						source={{
							uri: item.photoURL,
						}}
						style={{
							width: 52,
							aspectRatio: "1/1",
							borderRadius: 1000,
							backgroundColor: colors.input,
						}}
					/>
					<Text style={{ fontSize: 15 }}>{item.displayName}</Text>
				</View>

				<CustomTouchableOpacity
					// onPress={handleTagFriend}
					activeOpacity={checkFriend() ? 1 : 0.8}
					style={{
						backgroundColor: checkFriend()
							? colors.input
							: colors.primary,
						width: 90,
						paddingVertical: 8,
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 5,
					}}
				>
					<Text
						style={{
							color: checkFriend() ? "gray" : "white",
							fontWeight: "500",
						}}
					>
						リクエスト
					</Text>
				</CustomTouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default WithFriend;
