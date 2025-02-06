import { ImageType } from "./ImageType";
import { UserType } from "./UserType";

export interface AlbumType {
	aid: string;
	author: UserType["uid"];
	title: string;
	desc: string;
	cover: {
		fileName: string;
		uri: string;
	};
	taggedFriends: string[];
	images: ImageType[];
	create_at: number;
	update_at: number;
}
