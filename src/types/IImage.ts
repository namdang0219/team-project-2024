import { IAlbum } from "./IAlbum";
import { IUser } from "./IUser";

export interface IImage {
	iid: string;
	uri: string;
	author: IUser["uid"]; // uid
	album: IAlbum["aid"][];
	member: string[];
	location: {
		lat: number;
		long: number;
	};
	create_at: number;
	update_at: number;
}
