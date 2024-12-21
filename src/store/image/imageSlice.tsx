import { createSlice } from "@reduxjs/toolkit";
import { imageMocks } from "mock/imageMocks";
import { IImage } from "types/IImage";

const initialState: IImage[] = imageMocks;

const imageSlice = createSlice({
	initialState: initialState,
	name: "image",
	reducers: {
		addImage: (state, action) => {
			state.concat(action.payload);
		},
		removeImage: (state, action) => {
			const index = state.findIndex((i) => i.iid === action.payload);
			if (index > -1) {
				state.splice(index, 1);
			}
		},
	},
});

export const { addImage, removeImage } = imageSlice.actions;

export default imageSlice.reducer;
