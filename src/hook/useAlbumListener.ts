import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/configureStore";
import { db } from "../../firebaseConfig";
import { UserDataType } from "types/UserDataType";
import { setAlbums } from "store/album/albumSlice";
import { IAlbum } from "types/IAlbum";

export const useAlbumListener = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { albums } = useSelector(
		(state: RootState) => state.user as UserDataType
	);

	useEffect(() => {
		const q = query(
			collection(db, "00_albums"),
			where("aid", "in", albums)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const albumList: IAlbum[] = [];
			querySnapshot.forEach((doc) => {
				albumList.push(doc.data() as IAlbum);
			});
			console.log(albumList);
			dispatch(setAlbums(albumList));
		});

		return () => unsubscribe();
	}, []);
};
