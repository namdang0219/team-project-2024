import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import albumSlice from "./album/albumSlice";
import authStateSlice from "./authState/authStateSlice";

export const reducers = combineReducers({
	user: userSlice,
	album: albumSlice,
	authState: authStateSlice,
});
