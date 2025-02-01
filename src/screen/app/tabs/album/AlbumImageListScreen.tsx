import { View, StatusBar, Modal, Image, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "layout/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTouchableOpacity } from "components/custom";
import { useRoute, useTheme } from "@react-navigation/native";
import { IAlbum, ITaggedFriend } from "types/IAlbum";
import { IImage } from "types/IImage";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";
import { useItemWidth } from "hook/useItemWidth";
import { DIMENTIONS } from "constant/dimention";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import ImageViewScreen from "./ImageViewScreen";
import {
	arrayUnion,
	collection,
	doc,
	onSnapshot,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import { db, storage } from "../../../../../firebaseConfig";
import { useAlbum } from "context/album-context";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getBlobFromUri } from "util/func/getBlobFromUri";
import { useAuth } from "context/auth-context";
import { LoadingOverlay } from "components/loading";

const GAP = 4;

const AlbumImageListScreen = () => {
	const insets = useSafeAreaInsets();
	const { params } = useRoute<any>();
	const { currentUser } = useAuth();
	const { colors } = useTheme();
	const itemWidth = useItemWidth(GAP, 3, 0);
	const [showImageModal, setShowImageModal] = useState<boolean>(false);
	const [selectedImageId, setSelectedImageId] = useState<string>();
	const [adding, setAdding] = useState<boolean>(false);
	const [images, setImages] = useState<IImage[]>([]);
	console.log("🚀 ~ AlbumImageListScreen ~ images:", images);

	const aid = params?.aid;
	const [filteredAlbum, setFilteredAlbum] = useState<IAlbum>();

	useEffect(() => {
		const unsub = onSnapshot(doc(db, "0_albums", aid), (doc) => {
			setFilteredAlbum(doc.data() as IAlbum);
		});

		return unsub;
	}, [aid]);

	useEffect(() => {
		if (filteredAlbum?.images.length && filteredAlbum?.images.length > 0) {
			console.log(filteredAlbum.images);
			const q = query(
				collection(db, "0_images"),
				where("iid", "in", filteredAlbum?.images)
			);
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const images: IImage[] = [];
				querySnapshot.forEach((doc) => {
					images.push(doc.data() as IImage);
				});
				setImages(images as IImage[]);
			});

			return unsubscribe;
		}
	}, [filteredAlbum]);

	const pickImages = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [4, 3],
			quality: 1,
			allowsMultipleSelection: true,
		});

		if (!result.canceled) {
			try {
				setAdding(true);

				if (!result.assets || result.assets.length === 0) return;

				const albumDoc = doc(db, "0_albums", aid);
				const newImages: IImage["iid"][] = [];

				const uploadTasks = result.assets.map(async (asset, index) => {
					const timestamp = Date.now() + index;
					const fileName = `${timestamp}.jpg`;
					const photoRef = ref(storage, `0_photos/${fileName}`);
					const imageBlob = await getBlobFromUri(asset.uri);

					await uploadBytes(photoRef, imageBlob as Blob);
					const downloadUrl = await getDownloadURL(photoRef);

					if (currentUser) {
						const newImage: IImage = {
							album: aid,
							author: currentUser.uid,
							member: [currentUser.uid],
							uri: downloadUrl,
							create_at: Date.now(),
							update_at: Date.now(),
							iid: timestamp.toString(),
							location: {
								lat: 0,
								long: 0,
							},
						};
						await setDoc(
							doc(db, "0_images", timestamp.toString()),
							newImage
						);

						newImages.push(newImage.iid);
					}
				});

				await Promise.all(uploadTasks);

				if (newImages.length > 0) {
					await updateDoc(albumDoc, {
						images: arrayUnion(...newImages),
					});
				}
				Toast.success("写真追加済み");
			} catch (error) {
				console.log(error);
				Toast.error("写真追加失敗");
			} finally {
				setAdding(false);
			}
		}
	};

	const styles = StyleSheet.create({
		taggedFriendContainer: {
			width: 45,
			aspectRatio: 1,
			borderColor: colors.primary,
			backgroundColor: "white",
			borderWidth: 2,
			borderRadius: 1000,
			overflow: "hidden",
			padding: 1,
		},
		taggedFriendNum4: {
			width: 45,
			aspectRatio: 1,
			borderColor: "white",
			backgroundColor: "gray",
			borderWidth: 2,
			borderRadius: 1000,
			overflow: "hidden",
			marginLeft: -20,
			position: "relative",
			alignItems: "center",
			justifyContent: "center",
		},
	});

	return (
		<>
			{/* loading overlay  */}
			{adding && <LoadingOverlay />}

			<StatusBar barStyle={"dark-content"} />
			<View
				style={{
					flex: 1,
				}}
			>
				<Header
					canGoBack
					intensity={100}
					leftTitle={filteredAlbum?.title}
					leftTitleStyle={{ color: colors.iosBlue }}
					backIconColor={colors.iosBlue}
					rightContainer={
						<View>
							<CustomTouchableOpacity onPress={pickImages}>
								<AntDesign
									name="plus"
									size={22}
									color={colors.iosBlue}
								/>
							</CustomTouchableOpacity>
						</View>
					}
				/>

				<Animated.FlatList
					data={images}
					keyExtractor={(item) => item.iid}
					numColumns={3}
					ListHeaderComponent={
						<>
							{filteredAlbum &&
								filteredAlbum?.taggedFriends.length > 0 && (
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											gap: 5,
											paddingHorizontal:
												DIMENTIONS.APP_PADDING,
										}}
									>
										<Text
											style={{
												fontSize: 16,
												fontWeight: "500",
											}}
										>
											友達：
										</Text>
										<View
											style={{
												position: "relative",
												paddingBottom: 10,
											}}
										>
											{filteredAlbum?.taggedFriends.map(
												(friend) => (
													<>
														{filteredAlbum
															?.taggedFriends
															.length > 0 &&
															filteredAlbum?.taggedFriends
																.slice(0, 3)
																.map(
																	(
																		f: ITaggedFriend,
																		index
																	) => (
																		<View
																			key={
																				index
																			}
																			style={[
																				styles.taggedFriendContainer,
																				{
																					marginLeft:
																						index ==
																						0
																							? 0
																							: -20,
																				},
																			]}
																		>
																			{f?.photoURL ? (
																				<Image
																					source={{
																						uri: f?.photoURL,
																					}}
																					style={{
																						flex: 1,
																						borderRadius: 1000,
																					}}
																				/>
																			) : (
																				<View
																					style={{
																						backgroundColor:
																							colors.input,
																						flex: 1,
																						alignItems:
																							"center",
																						justifyContent:
																							"center",
																					}}
																				>
																					<Text
																						style={{
																							color: colors.icon,
																						}}
																					>
																						{f.displayName?.slice(
																							0,
																							1
																						)}
																					</Text>
																				</View>
																			)}
																		</View>
																	)
																)}
														{filteredAlbum
															?.taggedFriends
															.length > 3 && (
															<View
																style={
																	styles.taggedFriendNum4
																}
															>
																{filteredAlbum
																	?.taggedFriends[3]
																	?.photoURL ? (
																	<Image
																		source={{
																			uri: filteredAlbum
																				?.taggedFriends[3]
																				?.photoURL,
																		}}
																		style={{
																			flex: 1,
																			borderRadius: 1000,
																		}}
																	/>
																) : (
																	<View
																		style={{
																			backgroundColor:
																				colors.input,
																			flex: 1,
																			alignItems:
																				"center",
																			justifyContent:
																				"center",
																		}}
																	>
																		<Text
																			style={{
																				color: colors.icon,
																			}}
																		>
																			{filteredAlbum?.taggedFriends[3].displayName?.slice(
																				0,
																				1
																			)}
																		</Text>
																	</View>
																)}
																<View
																	style={[
																		{
																			backgroundColor:
																				"black",
																			opacity: 0.35,
																		},
																		StyleSheet.absoluteFill,
																	]}
																/>
																<AntDesign
																	name="plus"
																	size={24}
																	color={
																		"white"
																	}
																/>
															</View>
														)}
													</>
												)
											)}
										</View>
									</View>
								)}
						</>
					}
					itemLayoutAnimation={LinearTransition}
					contentContainerStyle={{
						gap: GAP,
						paddingTop: insets.top + DIMENTIONS.HEADER_HEIGHT,
					}}
					columnWrapperStyle={{
						gap: GAP,
					}}
					renderItem={({ item, index }) => (
						<CustomTouchableOpacity
							onPress={() => {
								setShowImageModal(true);
								setSelectedImageId(item.iid);
							}}
						>
							<Animated.Image
								source={{ uri: item.uri }}
								style={{
									width: itemWidth,
									aspectRatio: 1,
									backgroundColor: colors.input,
								}}
								entering={FadeIn.duration((index + 1) * 150)}
							/>
						</CustomTouchableOpacity>
					)}
				/>
			</View>
			<Modal visible={showImageModal}>
				<ImageViewScreen
					selectedImageId={selectedImageId}
					setShowImageModal={setShowImageModal}
				/>
			</Modal>
		</>
	);
};

export default AlbumImageListScreen;
