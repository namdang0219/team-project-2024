import { DIMENTIONS } from "constant/dimention";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export function useItemWidth(
	gap: number,
	numOfItem: number,
	containerPaddingH?: number
): number {
	const GAP = gap;
	const ITEM_PER_ROW = numOfItem;

	if (containerPaddingH || containerPaddingH === 0) {
		const ITEM_WIDTH =
			(width - containerPaddingH * 2 - GAP * (ITEM_PER_ROW - 1)) /
			ITEM_PER_ROW;
		return ITEM_WIDTH;
	} else {
		const ITEM_WIDTH =
			(width - DIMENTIONS.APP_PADDING * 2 - GAP * (ITEM_PER_ROW - 1)) /
			ITEM_PER_ROW;
		return ITEM_WIDTH;
	}
}
