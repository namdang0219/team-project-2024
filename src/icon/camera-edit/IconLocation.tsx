import useIconGradient from "hook/useIconGradient";
import React from "react";
import Svg, { Path } from "react-native-svg";

const IconLocation = ({ gradient }: { gradient: boolean }) => {
	const { color, SVGGradient } = useIconGradient(gradient);

	return (
		<Svg width={28} height={28} viewBox="0 0 24 24">
			{SVGGradient}
			<Path
				fill={color}
				d="M12 13.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5"
			></Path>
			<Path
				fill={color}
				d="M19.071 3.429h.001c3.905 3.905 3.905 10.237 0 14.142l-5.403 5.403a2.36 2.36 0 0 1-3.336 0l-5.375-5.375l-.028-.028c-3.905-3.905-3.905-10.237 0-14.142s10.236-3.905 14.141 0M5.99 4.489v.001a8.5 8.5 0 0 0 0 12.02l.023.024l.002.002l5.378 5.378a.86.86 0 0 0 1.214 0l5.403-5.404a8.5 8.5 0 0 0-.043-11.977A8.5 8.5 0 0 0 5.99 4.489"
			></Path>
		</Svg>
	);
};

export default IconLocation;
