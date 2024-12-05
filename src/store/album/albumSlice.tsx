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
		addAlbum: (state, action) => {
			state.push(action.payload);
		},
		removeAlbum: (state, action) => {
			state = state.filter((a) => a.id !== action.payload);
		},
	},
});

export const { setAlbums, addAlbum, removeAlbum } = albumSlice.actions;

export default albumSlice.reducer;
