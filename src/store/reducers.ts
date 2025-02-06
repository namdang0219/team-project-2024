import { combineReducers } from "@reduxjs/toolkit";
import { albumSlice } from "./album/albumSlice";
import { userSlice } from "./user/userSlice";

export const reducers = combineReducers({
	albums: albumSlice.reducer,
	user: userSlice.reducer,
});
