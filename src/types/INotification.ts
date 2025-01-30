import { IUser } from "./IUser";

export interface INotification {
	nid: string;
	noticeUserId: IUser["uid"];
	noticeUserData: {
		displayName: IUser["displayName"];
		photoURL: IUser["photoURL"];
	};
	toUser: IUser["uid"];
	type: "NEW_POST" | "MENTION" | "FRIEND_REQUEST";
	isChecked: boolean;
	create_at: number;
}
