import { INotification } from "types/INotification";

export const notificationMocks: INotification[] = [
	{
		nid: 1,
		userId: 2,
		type: "NEW_POST",
		isChecked: false,
		timestamp: Date.now(),
	},
	{
		nid: 2,
		userId: 4,
		type: "MENTION",
		isChecked: true,
		timestamp: Date.now(),
	},
	{
		nid: 3,
		userId: 2,
		type: "MENTION",
		isChecked: true,
		timestamp: Date.now(),
	},
	{
		nid: 4,
		userId: 3,
		type: "NEW_POST",
		isChecked: true,
		timestamp: Date.now(),
	},
];
