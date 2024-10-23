import React from "react";
import Svg, { Mask, Circle, G, Rect, Ellipse, Path } from "react-native-svg";

const AvatarDefault = () => {
	return (
		<Svg width="146" height="146" viewBox="0 0 146 146" fill="none">
			<Mask
				id="mask0_131_1342"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="146"
				height="146"
			>
				<Circle
					cx="72.9185"
					cy="72.9186"
					r="71.8073"
					fill="#E37171"
					stroke="black"
				/>
			</Mask>
			<G mask="url(#mask0_131_1342)">
				<Rect
					x="-0.564453"
					y="0.611328"
					width="145.79"
					height="145.79"
					fill="#9B9B9B"
				/>
				<Ellipse
					cx="72.3307"
					cy="61.7492"
					rx="28.2175"
					ry="28.2175"
					fill="white"
				/>
				<Path
					d="M125.238 140.48C125.238 167.752 103.762 194.563 72.9185 194.563C42.075 194.563 20.5986 167.752 20.5986 140.48C20.5986 113.208 42.075 95.802 72.9185 95.802C103.762 95.802 125.238 113.208 125.238 140.48Z"
					fill="white"
				/>
			</G>
		</Svg>
	);
};

export default AvatarDefault;
