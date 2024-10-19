import { DefaultTheme, Theme } from "@react-navigation/native";

// Theme Types
export type ThemeTypes = Theme & {
	dark: boolean;
	colors: {
		primary: string;
		background: string;
		error: string; // Red
		text: string;
		icon: string; // Middle Gray
		input: string; // Light Gray
	};
};

// Light Theme Colors
export const lightTheme: ThemeTypes = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#9A33EF",
		background: "#FFFFFF",
		error: "#FF4141",
		text: "#000000",
		icon: "#A2A2A8",
		input: "#F4F4F4",
	},
};

// Dark Theme Colors
export const darkTheme: ThemeTypes = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#9A33EF",
		background: "#13131A",
		error: "#FF4141",
		text: "#FFFFFF",
		icon: "#A2A2A8",
		input: "#262626",
	},
};
