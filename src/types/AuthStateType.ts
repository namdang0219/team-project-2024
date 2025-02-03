export interface AuthState {
	uid: string | null;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	isLoggedIn: boolean;
}
