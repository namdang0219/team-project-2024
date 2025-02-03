import { FriendRequestType } from "./FriendRequestType";

export type UserDataType = {
	uid: string;
	albums: string[];
	displayName: string;
	photoURL: string;
	email: string;
	friends: Record<
		string,
		{
			status: FriendRequestType["status"];
		}
	>[];
	posts: string[];
	create_at: number;
};
