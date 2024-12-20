export type ISticker = IARSticker;

export interface IARSticker {
	asid: string;
	type: "ar";
	stickerType: "glasses" | "hat" | "mustache" | "other";
	faceAnchor: "eyes" | "nose" | "mouth" | "forehead";
	sizeRatio: number;
	offset: { x: number; y: number };
	rotation?: number;
    source: string;
}

export interface IStaticSticker {
	ssid: number;
	type: "static";
	position: { x: number; y: number };
	size: { width: number; height: number };
	rotation?: number;
	stickerType: "emoji" | "text" | "decorative" | "other";
    source: string;
}

const detected_faces = [
	{
		bounds: {
			height: 0.9963541666666667,
			width: 1.7712962962962964,
			x: 0.010185185185185297,
			y: 0.21822916666666667,
		},
		landmarks: {
			LEFT_CHEEK: [Object],
			LEFT_EAR: [Object],
			LEFT_EYE: [Object],
			MOUTH_BOTTOM: [Object],
			MOUTH_LEFT: [Object],
			MOUTH_RIGHT: [Object],
			NOSE_BASE: [Object],
			RIGHT_CHEEK: [Object],
			RIGHT_EAR: [Object],
			RIGHT_EYE: [Object],
		},
		pitchAngle: -3.086122751235962,
		rollAngle: -23.467376708984375,
		yawAngle: 23.9910945892334,
	},
];
