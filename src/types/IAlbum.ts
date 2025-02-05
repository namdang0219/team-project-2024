import { IImage } from "./IImage";
import { IUser } from "./IUser";

export interface IAlbum {
	aid: string;
	author: IUser["uid"];
	title: string;
	desc: string;
	cover: {
		fileName: string;
		uri: string;
	};
	taggedFriends: string[];
	images: IImage[];
	create_at: number;
	update_at: number;
}
