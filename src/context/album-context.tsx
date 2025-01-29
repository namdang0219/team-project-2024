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
import { useAuth } from "./auth-context";

interface AlbumsContextType {
	albums: IAlbum[];
	fetchingAlbums: boolean;
	refreshAlbums: () => void;
}

const AlbumsContext = createContext<AlbumsContextType>({
	albums: [],
	fetchingAlbums: false,
	refreshAlbums: () => {},
});

const AlbumsProvider = ({ children }: { children: ReactNode }) => {
	const [remoteAlbums, setRemoteAlbums] = useState<IAlbum[]>([]);
	const [fetchingAlbums, setFetchingAlbums] = useState<boolean>(false);
	const { currentUser } = useAuth();
	const [refresh, setRefresh] = useState<boolean>(false);

	function refreshAlbums() {
		setRefresh(!refresh);
	}

	useEffect(() => {
		async function fetchAlbums() {
			if (currentUser)
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
						setFetchingAlbums(false);
						setRemoteAlbums(albums.reverse());
					});
				} catch (error) {
					console.log(error);
					setFetchingAlbums(false);
				}
		}
		fetchAlbums();
	}, [refresh, currentUser]);

	const values = {
		albums: remoteAlbums,
		fetchingAlbums,
		refreshAlbums,
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
