import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/configureStore";
import { db } from "../../firebaseConfig";
import { UserDataType } from "types/UserDataType";
import { setAlbums } from "store/album/albumSlice";
import { IAlbum } from "types/IAlbum";

export const useAlbumListener = () => {
	const { uid } = useSelector(
		(state: RootState) => state.user as UserDataType
	);

	useEffect(() => {
		if (!uid) return;

		const albumsRef = collection(db, "albums");

		const userAlbumsQuery = query(albumsRef, where("author", "==", uid));

		const taggedAlbumsQuery = query(
			albumsRef,
			where("taggedFriends", "array-contains", uid)
		);

		const unsubscribeUserAlbums = onSnapshot(
			userAlbumsQuery,
			(snapshot) => {
				const userAlbums = snapshot.docs.map((doc) => ({
					...doc.data(),
				}));
				setAlbums((prev: IAlbum[]) => {
					const existingIds = new Set(prev.map((a: IAlbum) => a.aid));
					return [
						...userAlbums,
						...prev.filter((a) => !existingIds.has(a.aid)),
					];
				});
			}
		);

		const unsubscribeTaggedAlbums = onSnapshot(
			taggedAlbumsQuery,
			(snapshot) => {
				const taggedAlbums = snapshot.docs.map((doc) => ({
					...doc.data(),
				}));
				setAlbums((prev: IAlbum[]) => {
					const existingIds = new Set(prev.map((a) => a.aid));
					return [
						...taggedAlbums,
						...prev.filter((a) => !existingIds.has(a.aid)),
					];
				});
			}
		);

		return () => {
			unsubscribeUserAlbums();
			unsubscribeTaggedAlbums();
		};
	}, []);
};
