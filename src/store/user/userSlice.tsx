import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
	displayName: string;
	email: string;
	posts: number;
	friends: number;
}

const initialState = {
	displayName: "MeowCopter",
	email: "meowcopter99@gmail.com",
	posts: 26,
	friends: 99,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => ({
			displayName: action.payload.displayName,
			email: action.payload.email,
			posts: action.payload.posts,
			friends: action.payload.friends,
		}),
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
