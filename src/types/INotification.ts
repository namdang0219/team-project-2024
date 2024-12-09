export interface INotification {
	nid: number;
	userId: number;
	type: "NEW_POST" | "MENTION";
	isChecked: boolean;
	timestamp: number;
}