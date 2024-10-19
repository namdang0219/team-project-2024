import { ThemeTypes } from "util/theme/themeColors";

declare module "@react-navigation/native" {
	export function useTheme(): ThemeTypes;
}
