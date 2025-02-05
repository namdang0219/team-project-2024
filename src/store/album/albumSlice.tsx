import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAlbum } from "types/IAlbum";

const initialState: IAlbum[] = [];

export const toggleAlbumFavorite = createAsyncThunk(
	"albumSlice/toggleAlbumFavorite",
	async ({ albumId }: { albumId: string }, { rejectWithValue }) => {
		try {
			
			// return albumId;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const albumSlice = createSlice({
	name: "album",
	initialState: initialState,
	reducers: {
		setAlbums: (state, action) => {
			return action.payload;
		},
	},
});

export const { setAlbums } = albumSlice.actions;
