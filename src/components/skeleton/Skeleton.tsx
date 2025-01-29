import { View, Text } from "react-native";
import React from "react";
import { SkeletonProps, Skeleton as ThemedUISkeleton } from "@rneui/themed";

const Skeleton = ({ width = 50, height = 50, ...props }: SkeletonProps) => {
	return (
		<View
			style={{
				opacity: 0.3,
				borderRadius: 8,
				overflow: "hidden",
				width,
				height,
			}}
		>
			<ThemedUISkeleton
				animation="pulse"
				width={width}
				height={height}
				{...props}
			/>
		</View>
	);
};

export default Skeleton;
