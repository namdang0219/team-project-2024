import { createSlice } from "@reduxjs/toolkit";
import { AlbumType } from "types/AlbumType";

const initialState: AlbumType[] = [];

export const albumSlice = createSlice({
	name: "albums",
	initialState,
	reducers: {
		setAlbums: (state, action) => {
			return action.payload;
		},
	},
});

export const { setAlbums } = albumSlice.actions;
