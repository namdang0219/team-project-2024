import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	debug: true,
	stateReconciler: hardSet,
};

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
			// serializableCheck: false, // ignore serializable stringify 2 times
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
