import { IImage } from "./IImage";

export interface IAlbum {
	aid: number;
	title: string;
	desc: string;
	cover: string;
	favorite: boolean;
	taggedFriends: number[];
	images: IImage[];
}
