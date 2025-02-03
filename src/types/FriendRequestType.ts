export type FriendRequestType = {
	from: string;
	to: string;
	status: "REJECTED" | "ACCEPTED" | "PENDING";
	timestamp: number;
};
