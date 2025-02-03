import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	TouchableWithoutFeedback,
	FlatList,
	Dimensions,
} from "react-native";
import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { DIMENTIONS } from "constant/dimention";
import { useNavigation, useTheme } from "@react-navigation/native";
import handlePressBackground from "util/func/handlePressBackground";
import { AntDesign, Feather } from "@expo/vector-icons";
import { CustomTouchableOpacity } from "components/custom";
import { IAlbum } from "types/IAlbum";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { AlbumItem } from "components/item";

const GAP = 8;

const AlbumSearch = ({
	toggleSeachModal,
}: {
	toggleSeachModal: Dispatch<SetStateAction<boolean>>;
}) => {
	const { colors } = useTheme();
	const inputRef = useRef<TextInput | null>(null);
	const { navigate } = useNavigation<any>();
	const [searchText, setSearchText] = useState<string>("");
	const [results, setResults] = useState<IAlbum[]>([]);
	const albums = useSelector((state: RootState) => state.album);

	useEffect(() => {
		if (searchText.trim() === "") {
			setResults([]);
			return;
		}
		const filteredResults = albums.filter((album) =>
			album.title.toLowerCase().includes(searchText.toLowerCase())
		);
		setResults(filteredResults);
	}, [searchText]);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={handlePressBackground}>
				{/* header  */}
				<View style={{ flex: 1 }}>
					<View
						style={{
							height: DIMENTIONS.HEADER_HEIGHT,
							paddingHorizontal: DIMENTIONS.APP_PADDING,
							flexDirection: "row",
							alignItems: "center",
							gap: 12,
						}}
					>
						<View style={{ flex: 1, position: "relative" }}>
							<TextInput
								ref={inputRef}
								placeholder="アルバム検索..."
								value={searchText}
								onChangeText={(text) => setSearchText(text)}
								style={{
									backgroundColor: colors.input,
									paddingVertical: 10,
									paddingHorizontal: 16,
									borderRadius: 10,
								}}
							/>
							<Feather
								name="search"
								size={20}
								color="gray"
								style={{
									position: "absolute",
									right: 10,
									top: "50%",
									transform: [{ translateY: -15 }],
								}}
							/>
						</View>
						<CustomTouchableOpacity
							onPress={() => toggleSeachModal(false)}
						>
							<Text style={{ color: "blue" }}>キャンセル</Text>
						</CustomTouchableOpacity>
					</View>

					{/* results */}
					{/* <View
						style={{
							flex: 1,
							paddingHorizontal: DIMENTIONS.APP_PADDING,
							paddingTop: 6,
						}} 
					>
						{results.length == 0 && searchText !== "" && (
							<View
								style={{
									height: 200,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text>結果なし</Text>
							</View>
						)}
						{results.length > 0 && (
							<>
								<Text
									style={{
										marginLeft: 10,
										fontWeight: "500",
										color: "gray",
										marginBottom: 10,
									}}
								>
									結果
								</Text>
								<View style={{ flex: 1 }}>
									<FlatList
										data={results}
										numColumns={2}
										columnWrapperStyle={{ gap: GAP }}
										contentContainerStyle={{
											gap: GAP,
											paddingBottom: 100,
										}}
										keyExtractor={(item: IAlbum) =>
											String(item.aid)
										}
										renderItem={({ item }) => (
											<AlbumItem item={item} />
										)}
									/>
								</View>
							</>
						)}
					</View> */}
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default AlbumSearch;
