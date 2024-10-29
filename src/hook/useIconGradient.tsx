import { ReactNode } from "react";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { GLOBAL_GRADIENT } from "util/theme/themeColors";

export default function useIconGradient(gradient: boolean): {
	color: string;
	SVGGradient: ReactNode;
} {
	if (gradient) {
		const SVGGradient = (
			<Defs>
				<LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
					<Stop offset="0%" stopColor={GLOBAL_GRADIENT.STOP_1} />
					<Stop offset="100%" stopColor={GLOBAL_GRADIENT.STOP_2} />
				</LinearGradient>
			</Defs>
		);
		return {
			color: "url(#grad)",
			SVGGradient,
		};
	} else {
		return {
			color: "white",
			SVGGradient: null,
		};
	}
}
