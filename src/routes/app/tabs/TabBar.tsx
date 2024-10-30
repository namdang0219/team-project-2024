import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	MaterialCommunityIcons,
	Ionicons,
	Fontisto,
	FontAwesome5,
} from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { GLOBAL_GRADIENT } from "util/theme/themeColors";
import { useState } from "react";
import Svg, { Path } from "react-native-svg";

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
	const insets = useSafeAreaInsets();
	const { colors } = useTheme();
	const [containerWidth, setContainerWidth] = useState<number>(0);
	const CAMERA_BUTTON_HEIGHT = 50;

	const icon: Record<string, (props: any) => JSX.Element> = {
		AlbumStack: (props: any) => (
			<MaterialCommunityIcons
				name="image-multiple-outline"
				size={24}
				{...props}
			/>
		),
		MapStack: (props: any) => (
			<MaterialCommunityIcons
				name="map-marker-radius-outline"
				size={26}
				{...props}
			/>
		),
		CameraStack: () => (
			<LinearGradient
				colors={[GLOBAL_GRADIENT.STOP_1, GLOBAL_GRADIENT.STOP_2]}
				style={{
					width: CAMERA_BUTTON_HEIGHT,
					aspectRatio: "1/1",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: 1000,
				}}
			>
				{/* <Ionicons name="camera-outline" size={30} color={"white"} /> */}
				<Svg width="27" height="23" viewBox="0 0 27 23" fill="none">
					<Path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M8.30123 2.77359C8.6147 1.25087 9.98365 0.17334 11.551 0.17334H15.3878C16.9552 0.17334 18.323 1.25087 18.6376 2.77359C18.6723 2.94126 18.7629 3.09251 18.895 3.20299C19.027 3.31347 19.1927 3.37676 19.3655 3.38268H19.4043C21.0515 3.45474 22.3171 3.65467 23.3737 4.34164C24.0394 4.77405 24.6124 5.32966 25.0585 5.97944C25.6138 6.78613 25.858 7.71371 25.9754 8.83425C26.0905 9.93037 26.0905 11.3031 26.0905 13.0421V13.1409C26.0905 14.8798 26.0905 16.2537 25.9754 17.3487C25.858 18.4692 25.6138 19.3968 25.0585 20.2047C24.6099 20.8539 24.0376 21.4103 23.3737 21.8425C22.5484 22.3783 21.6009 22.6154 20.4527 22.7282C19.3279 22.8398 17.9179 22.8398 16.1263 22.8398H10.8125C9.02092 22.8398 7.61088 22.8398 6.48614 22.7282C5.33791 22.6154 4.39045 22.3795 3.56509 21.8425C2.90109 21.4099 2.3288 20.8532 1.88032 20.2035C1.32499 19.3968 1.08079 18.4692 0.963385 17.3487C0.848328 16.2537 0.848328 14.8798 0.848328 13.1409V13.0421C0.848328 11.3031 0.848328 9.93037 0.963385 8.83425C1.08079 7.71371 1.32499 6.78613 1.88032 5.97944C2.3288 5.32975 2.90109 4.77301 3.56509 4.34048C4.62174 3.65467 5.88737 3.45474 7.53457 3.38384L7.55453 3.38268H7.57331C7.74608 3.37676 7.91182 3.31347 8.04386 3.20299C8.17589 3.09251 8.26654 2.94126 8.30123 2.77359ZM11.551 1.91691C10.7996 1.91691 10.1691 2.43185 10.0271 3.12114C9.79815 4.23703 8.79785 5.11579 7.59445 5.12625C6.01182 5.19599 5.16415 5.38778 4.53016 5.79927C4.05989 6.10605 3.65436 6.50044 3.33615 6.96049C3.01211 7.43125 2.81722 8.03453 2.7139 9.01441C2.61058 10.0094 2.60941 11.2927 2.60941 13.092C2.60941 14.8914 2.60941 16.1735 2.71507 17.1685C2.81722 18.1484 3.01211 18.7517 3.33732 19.2236C3.65197 19.6816 4.05702 20.0768 4.53134 20.3848C5.02092 20.7022 5.64786 20.894 6.66107 20.9939C7.6872 21.095 9.00918 21.0962 10.8607 21.0962H16.0782C17.9285 21.0962 19.2505 21.0962 20.2778 20.9939C21.291 20.894 21.9179 20.7033 22.4075 20.3848C22.8818 20.0768 23.288 19.6816 23.6027 19.2225C23.9267 18.7517 24.1216 18.1484 24.2249 17.1685C24.3282 16.1735 24.3294 14.8903 24.3294 13.092C24.3294 11.2938 24.3294 10.0094 24.2238 9.01441C24.1216 8.03453 23.9267 7.43125 23.6015 6.96049C23.2834 6.50002 22.8779 6.10523 22.4075 5.7981C21.7759 5.38778 20.9282 5.19599 19.3432 5.12625C18.141 5.11462 17.1407 4.23819 16.9117 3.12114C16.8366 2.77739 16.6439 2.46985 16.3663 2.25045C16.0887 2.03105 15.743 1.91324 15.3878 1.91691H11.551ZM13.4694 10.0536C12.7688 10.0536 12.0969 10.3291 11.6015 10.8196C11.1061 11.3101 10.8278 11.9753 10.8278 12.6689C10.8278 13.3626 11.1061 14.0278 11.6015 14.5183C12.0969 15.0088 12.7688 15.2843 13.4694 15.2843C14.17 15.2843 14.8419 15.0088 15.3373 14.5183C15.8327 14.0278 16.111 13.3626 16.111 12.6689C16.111 11.9753 15.8327 11.3101 15.3373 10.8196C14.8419 10.3291 14.17 10.0536 13.4694 10.0536ZM9.06671 12.6689C9.06671 11.5129 9.53057 10.4042 10.3562 9.58671C11.1819 8.76925 12.3017 8.31001 13.4694 8.31001C14.6371 8.31001 15.7569 8.76925 16.5826 9.58671C17.4083 10.4042 17.8721 11.5129 17.8721 12.6689C17.8721 13.825 17.4083 14.9337 16.5826 15.7512C15.7569 16.5686 14.6371 17.0279 13.4694 17.0279C12.3017 17.0279 11.1819 16.5686 10.3562 15.7512C9.53057 14.9337 9.06671 13.825 9.06671 12.6689ZM19.6332 9.1818C19.6332 8.95059 19.726 8.72884 19.8911 8.56535C20.0562 8.40186 20.2802 8.31001 20.5137 8.31001H21.6878C21.9213 8.31001 22.1453 8.40186 22.3104 8.56535C22.4756 8.72884 22.5683 8.95059 22.5683 9.1818C22.5683 9.41301 22.4756 9.63475 22.3104 9.79824C22.1453 9.96173 21.9213 10.0536 21.6878 10.0536H20.5137C20.2802 10.0536 20.0562 9.96173 19.8911 9.79824C19.726 9.63475 19.6332 9.41301 19.6332 9.1818Z"
						fill="white"
					/>
				</Svg>
			</LinearGradient>
		),
		NotificationStack: (props: any) => (
			<Fontisto name="bell" size={24} {...props} />
		),
		ProfileStack: (props: any) => (
			<FontAwesome5 name="user-alt" size={22} {...props} />
		),
	};

	const styles = StyleSheet.create({
		container: {
			bottom: insets.bottom + 10,
			position: "absolute",
			backgroundColor: "white",
			alignItems: "center",
			justifyContent: "space-between",
			borderRadius: 1000,
			shadowOffset: { width: 0, height: 5 },
			shadowRadius: 10,
			shadowOpacity: 0.08,
			padding: 4,
			gap: 10,
			paddingHorizontal: 20,
			paddingVertical: 4,
			margin: "auto",
			left: "50%",
			transform: [{ translateX: -containerWidth / 2 }],
			height: CAMERA_BUTTON_HEIGHT + 8,
		},
		tabbarItem: {
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 1000,
			width: 40,
			aspectRatio: "1/1",
		},
	});

	return (
		<View
			style={[{ flexDirection: "row" }, styles.container]}
			onLayout={(event) => {
				setContainerWidth(event.nativeEvent.layout.width);
			}}
		>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});
					if (route.name === "CameraStack") {
						navigation.navigate("GlobalStack", {
							screen: "CameraScreen",
						});
					} else if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				return (
					<Pressable
						key={route.name}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={[
							styles.tabbarItem,
							route.name === "MapStack" && { marginRight: 8 },
							route.name === "NotificationStack" && {
								marginLeft: 8,
							},
						]}
					>
						{icon[route.name]({
							color: isFocused ? colors.primary : "#d4d4d4",
						})}
					</Pressable>
				);
			})}
		</View>
	);
}

export default TabBar;
