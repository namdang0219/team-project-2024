import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import authStateSlice from "./authState/authStateSlice";
import albumSlice from './album/albumSlice';

export const reducers = combineReducers({
	user: userSlice,
	album: albumSlice,
	authState: authStateSlice,
}); 
