import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import albumSlice from "./album/albumSlice";
import imageSlice from "./image/imageSlice";

export const reducers = combineReducers({
	user: userSlice,
	album: albumSlice,
	image: imageSlice,
});
