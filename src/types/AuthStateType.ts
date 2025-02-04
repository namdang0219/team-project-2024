
export type UserAuthType = {
	uid: string;
	email: string | null;
	displayName: string;
	photoURL: string;
};

export type AuthStateType = {
	user: UserAuthType | null;
	loading: boolean;
	isLoggedIn: boolean;
};
