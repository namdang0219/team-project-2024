import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "types/IUser";

// First, create the thunk
const fetchUserById = createAsyncThunk(
	"users/fetchByIdStatus",
	async (userId: number, thunkAPI) => {
		// const response = await userAPI.fetchById(userId);
		// return response.data;
	}
);

const initialState: IUser = {
	uid: "1",
	displayName: "MeowCopter",
	email: "meowcopter99@gmail.com",
	photoURL:
		"https://i.pinimg.com/564x/80/d9/0f/80d90f5c9d70000402c52115fee99bdb.jpg",
	friends: [],
	posts: [],
	albums: [],
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
});

// export const { setUser } = userSlice.actions;

export default userSlice.reducer;
