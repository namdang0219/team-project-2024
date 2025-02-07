import { UserType } from "./UserType";

export interface ImageType {
	iid: string;
	source: { fileName: string; uri: string };
	author: UserType["uid"];
	album: string;
	location: {
		lat: number;
		long: number;
	};
	create_at: number;
	update_at: number;
}
