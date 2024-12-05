import { createSlice } from "@reduxjs/toolkit";
import { albumMocks } from "mock/albumMocks";
import { IAlbum } from "types/IAlbum";

const initialState: IAlbum[] = albumMocks;

const albumSlice = createSlice({
	name: "album",
	initialState: initialState,
	reducers: {
		setAlbums: (state, action) => {
			state = action.payload;
		},
	},
});

export const { setAlbums } = albumSlice.actions;

export default albumSlice.reducer;
