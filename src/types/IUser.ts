export interface IUser {
	uid: string;
	displayName: string;
	email: string;
	photoURL: string | undefined | null;
	posts: string[];
	friends: string[];
	albums: string[];
	create_at: number;
}
