import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import albumSlice from "./album/albumSlice";

export const reducers = combineReducers({
	user: userSlice,
	album: albumSlice,
});
