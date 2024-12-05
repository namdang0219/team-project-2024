export interface IAlbum {
	id: number;
	title: string;
	desc: string;
	cover: string;
	favorite: boolean;
	taggedFriends: number[]; // array of friends id
}