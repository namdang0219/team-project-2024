import { combineReducers } from "@reduxjs/toolkit";
import authStateSlice from "./authState/authStateSlice";
import albumSlice from './album/albumSlice';
import { userSlice } from "./user/userSlice";

export const reducers = combineReducers({
	user: userSlice.reducer,
	album: albumSlice,
	authState: authStateSlice,
}); 
