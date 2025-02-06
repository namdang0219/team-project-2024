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

		// Need {...currentAlbum.aid, update_at: Date.now()}
		updateAlbum: (state, action: PayloadAction<AlbumType>) => {
			const index = state.findIndex(
				(album) => album.aid === action.payload.aid
			);
			if (index !== -1) {
				state[index] = action.payload;
			}
		},
		removeAlbum: (state, action: PayloadAction<string>) => {
			return (state = state.filter(
				(album) => album.aid !== action.payload
			));
		},
	},
});

export const { addNewAlbum, updateAlbum, removeAlbum } = albumSlice.actions;
