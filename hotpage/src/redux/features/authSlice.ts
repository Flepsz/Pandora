import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	registerNumber: string;
	account: string;
}

const initialState = {
	isAuthenticated: false,
	isLoading: true,
	registerNumber: "",
	account: "",
} as AuthState;

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state) => {
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.isAuthenticated = false;
		},
		finishInitialLoad: (state) => {
			state.isLoading = false;
		},
		setRegisterNumber: (state, action) => {
			state.registerNumber = action.payload;
		},
		setAccount: (state, action) => {
			state.account = action.payload;
		},
	},
});

export const { setAuth, logout, finishInitialLoad, setRegisterNumber, setAccount } = authSlice.actions;
export default authSlice.reducer;
