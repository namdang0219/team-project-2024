import { createSlice } from "@reduxjs/toolkit";
import { UserDataType } from "types/UserDataType";

const initialState: UserDataType = {
	uid: "",
	displayName: "",
	email: "",
	photoURL: "",
	albums: [],
	friends: [],
	create_at: 0,
	posts: [],
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
