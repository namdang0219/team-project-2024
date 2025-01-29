import React, { createContext, ReactNode, useEffect, useState } from "react";
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { IAlbum } from "types/IAlbum";
import { db } from "../../firebaseConfig";
import { User } from "firebase/auth";

interface AlbumsContextType {
	albums: IAlbum[];
	fetchingAlbums: boolean;
}

const AlbumsContext = createContext<AlbumsContextType>({
	albums: [],
	fetchingAlbums: false,
});

const AlbumsProvider = ({ children }: { children: ReactNode }) => {
	const [remoteAlbums, setRemoteAlbums] = useState<IAlbum[]>([]);
	const [fetchingAlbums, setFetchingAlbums] = useState<boolean>(false);
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	useEffect(() => {
		try {
			setFetchingAlbums(true);
			const q = query(
				collection(db, "0_albums"),
				where("author", "==", String(currentUser?.uid)),
				orderBy("update_at", "asc")
			);
			onSnapshot(q, (querySnapshot) => {
				const albums: IAlbum[] = [];
				querySnapshot.forEach((doc) => {
					albums.push(doc.data() as IAlbum);
				});
                setFetchingAlbums(false)
				setRemoteAlbums(albums);
			});
		} catch (error) {
			console.log(error);
            setFetchingAlbums(false);
		}
	}, []);

	const values = {
		albums: remoteAlbums,
		fetchingAlbums,
	};
	return (
		<AlbumsContext.Provider value={values}>
			{children}
		</AlbumsContext.Provider>
	);
};

const useAlbum = () => {
	const context = React.useContext(AlbumsContext);
	if (!context) {
		throw new Error("useAlbum must be used within an AlbumsProvider");
	}
	return context;
};

export { AlbumsProvider, useAlbum };
