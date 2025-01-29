import { User } from "firebase/auth";
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
	favorite: boolean;
	taggedFriends: ITaggedFriend[];
	images: IImage[];
	create_at: number;
	update_at: number;
}

export interface ITaggedFriend {
	userId: IUser["uid"];
	displayName: User["displayName"];
	photoURL: User["photoURL"];
}
