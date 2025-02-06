import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./auth/AuthStack";
import AppStack from "./app/AppStack";
import GlobalStack from "./app/global/GlobalStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";

const Stack = createNativeStackNavigator();

const RootStack = () => {
	// useEffect(() => {
	// 	const getDataFromAsyncStorage = async () => {
	// 		try {
	// 			const keys = await AsyncStorage.getAllKeys();
	// 			if (keys) {
	// 				const persistRoot = await AsyncStorage.getItem(
	// 					"persist:root"
	// 				);
	// 				if (persistRoot) {
	// 				}
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	// 	getDataFromAsyncStorage();
	// }, []);
	const albums = useSelector((state: RootState) => state.albums);
	console.log("🚀 ~ RootStack ~ albums:", albums)

	// return (
	// 	<View>
	// 		<Text>namdang</Text>
	// 	</View>
	// );

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{/* <Stack.Screen name="AuthStack" component={AuthStack} /> */}
			<Stack.Screen name="AppStack" component={AppStack} />
			<Stack.Screen name="GlobalStack" component={GlobalStack} />
		</Stack.Navigator>
	);
};

export default RootStack;
