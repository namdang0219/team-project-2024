import { createSlice } from "@reduxjs/toolkit";
import { UserDataType } from "types/UserDataType";

const initialState: UserDataType = {
	uid: "",
	displayName: "",
	email: "",
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
			return { ...state, ...action.payload } as UserDataType;
		},
	},
});

export const { setUserData } = userSlice.actions;
