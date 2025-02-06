import { combineReducers } from "@reduxjs/toolkit";
import authStateSlice from "./authState/authStateSlice";
import { userSlice } from "./user/userSlice";
import { albumSlice } from "./album/albumSlice";

export const reducers = combineReducers({
	user: userSlice.reducer,
	album: albumSlice.reducer,
	authState: authStateSlice,
});
