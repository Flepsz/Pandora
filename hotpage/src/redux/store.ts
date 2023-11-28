import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { apiSlice } from "./services/apiSlice";

export const makeStore = () =>
	configureStore({
		reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
			auth: authReducer,
		},
		devTools: process.env.NODE_ENV !== "production",
	});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
