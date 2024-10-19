import { Keyboard } from "react-native";

export default function handlePressBackground() {
	if (Keyboard.isVisible()) {
		Keyboard.dismiss();
	}
}
