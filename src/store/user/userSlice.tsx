import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "types/UserType";

const initialState: UserType = {
	uid: "userid01",
	displayName: "MeowCopter",
	email: "meowcopter@gmail.com",
	photoURL: "",
	friends: [],
	favorites: [],
	create_at: 0,
	posts: [],
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserData: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { setUserData } = userSlice.actions;
