import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";

export const reducers = combineReducers({
	user: userSlice,
});
