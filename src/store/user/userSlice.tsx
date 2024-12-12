import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "types/IUser";

const initialState: IUser = {
	uid: "1",
	displayName: "MeowCopter",
	email: "meowcopter99@gmail.com",
	photoURL:
		"https://i.pinimg.com/564x/80/d9/0f/80d90f5c9d70000402c52115fee99bdb.jpg",
	posts: 26,
	friends: 99,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => ({
			uid: action.payload.uid,
			displayName: action.payload.displayName,
			email: action.payload.email,
			photoURL: action.payload.photoURL,
			posts: action.payload.posts,
			friends: action.payload.friends,
		}),
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
