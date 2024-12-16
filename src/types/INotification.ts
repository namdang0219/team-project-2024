import { IUser } from "./IUser";

export interface INotification {
	nid: string;
	noticeUser: IUser["uid"];
	type: "NEW_POST" | "MENTION";
	isChecked: boolean;
	timestamp: number;
}