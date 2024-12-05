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
			state = state.filter((a) => a.aid !== action.payload);
		},
		addImagesToAlbum: (state, action) => {
			const albumIndex = state.findIndex(
				(a) => a.aid === action.payload.aid
			);
			// payload: {aid: albumId, images: images}
			if (albumIndex > -1) {
				state[albumIndex].images = [
					...state[albumIndex].images,
					...action.payload.images,
				];
			}
		},
		addAlbumToFavorites: (state, action) => {
			const albumIndex = state.findIndex(
				(a) => a.aid === action.payload.aid
			);
			// payload: {aid: albumId, images: images}
			if (albumIndex > -1) {
				state[albumIndex].favorite = true;
			}
		},
		removeAlbumFromFavorites: (state, action) => {
			const albumIndex = state.findIndex(
				(a) => a.aid === action.payload.aid
			);
			// payload: aid
			if (albumIndex > -1) {
				state[albumIndex].favorite = false;
			}
		},
	},
});

export const {
	setAlbums,
	addAlbum,
	removeAlbum,
	addImagesToAlbum,
	addAlbumToFavorites,
	removeAlbumFromFavorites,
} = albumSlice.actions;

export default albumSlice.reducer;
