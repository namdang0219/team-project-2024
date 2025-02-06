import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
	writeBatch,
} from "firebase/firestore";
import { IAlbum } from "types/IAlbum";
import { db } from "../../../firebaseConfig";
import { Toast } from "toastify-react-native";
import { UserDataType } from "types/UserDataType";

const initialState: IAlbum[] = [];

export const toggleAlbumFavorite = createAsyncThunk<
	string,
	{ userId: string; albumId: string },
	{ rejectValue: string }
>(
	"albumSlice/toggleAlbumFavorite",
	async ({ userId, albumId }, { rejectWithValue }) => {
		try {
			let docData: UserDataType;

			// update user favorite albums
			const docRef = doc(db, "00_users", userId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				docData = docSnap.data() as UserDataType;
				if (docData.favorites.includes(albumId)) {
					await updateDoc(docRef, {
						favorites: arrayRemove(albumId),
					});
				} else if (!docData.favorites.includes(albumId)) {
					await updateDoc(docRef, {
						favorites: arrayUnion(albumId),
					});
				}
			}

			// update update_at in album doc
			const albumRef = doc(db, "00_albums", albumId);
			await updateDoc(albumRef, {
				update_at: Date.now(),
			});

			Toast.success("変更済み！🎉");
			return albumId;
		} catch (error: any) {
			Toast.error("変更失敗！🎉");
			return rejectWithValue(error.message);
		}
	}
);

export const deleteAlbum = createAsyncThunk<string, { albumId: string }>(
	"albumSlice/deleteAlbum",
	async ({ albumId }, { rejectWithValue }) => {
		try {
			const batch = writeBatch(db);

			const albumRef = doc(db, "albums", albumId);
			batch.delete(albumRef);

			const usersRef = collection(db, "00_users");

			const favoritesQuery = query(
				usersRef,
				where("favorites", "array-contains", albumId)
			);
			const favoritesSnapshot = await getDocs(favoritesQuery);

			favoritesSnapshot.forEach((docSnap) => {
				const userRef = doc(db, "00_users", docSnap.id);
				console.log(docSnap.data());
				batch.update(userRef, { favorites: arrayRemove(albumId) });
			});

			await batch.commit();

			Toast.success("削除済み！🎉");
			return albumId;
		} catch (error: any) {
			Toast.error("削除失敗！🎉");
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
