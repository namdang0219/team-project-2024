import { INotification } from "types/INotification";

export const notificationMocks: INotification[] = [
	{
		nid: "1",
		noticeUser: "2",
		type: "NEW_POST",
		isChecked: false,
		timestamp: Date.now(),
	},
	{
		nid: "2",
		noticeUser: "4",
		type: "MENTION",
		isChecked: true,
		timestamp: Date.now(),
	},
	{
		nid: "3",
		noticeUser: "2",
		type: "MENTION",
		isChecked: true,
		timestamp: Date.now(),
	},
	{
		nid: "4",
		noticeUser: "3",
		type: "NEW_POST",
		isChecked: true,
		timestamp: Date.now(),
	},
];
