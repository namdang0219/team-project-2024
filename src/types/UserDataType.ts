import { FriendRequestType } from "./FriendRequestType";

export type UserDataType = {
	uid: string;
	displayName: string;
	photoURL: string;
	email: string;
	friends: Record<
		string,
		{
			status: FriendRequestType["status"];
		}
	>[];
	favorites: string[];
	posts: string[];
	create_at: number;
};
