import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlbumType } from "types/AlbumType";

const initialState: AlbumType[] = [];

export const albumSlice = createSlice({
	name: "albums",
	initialState,
	reducers: {
		addNewAlbum: (state, action: PayloadAction<AlbumType>) => {
			state.push(action.payload);
		},
		setAlbums: (state, action) => {
			return action.payload;
		},
	},
});

export const { addNewAlbum, setAlbums } = albumSlice.actions;
