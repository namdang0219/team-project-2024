import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "react-native-fs";

export const resetAppData = async () => {
	try {
		console.log("Deleting app data...");

		await AsyncStorage.clear();
		console.log("Async storage cleared");

		const dirPath = FileSystem.DocumentDirectoryPath;
		const files = await FileSystem.readDir(dirPath);

		for (const file of files) {
			await FileSystem.unlink(file.path);
		}
		console.log("Deleted app data");

		console.log("App data was removed successfully");
	} catch (error) {
		console.error("Error:", error);
	}
};
