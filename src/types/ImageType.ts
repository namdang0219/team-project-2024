import { AlbumType } from "./AlbumType";
import { UserType } from "./UserType";

export interface ImageType {
	iid: string;
	uri: string;
	author: UserType["uid"];
	album: AlbumType["aid"][];
	location: {
		lat: number;
		long: number;
	};
	create_at: number;
	update_at: number;
}
