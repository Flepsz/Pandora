import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	registerNumber: string;
	account: string;
  name: string;
	token: {
    access: string;
    refresh: string;
  };
}

const initialState = {
	isAuthenticated: false,
	isLoading: true,
	registerNumber: "",
	account: "",
  name: "",
	token: {
    access: "",
    refresh: "",
  },
} as AuthState;

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<{ access: string; refresh: string }>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
		setOnlyAuth: (state) => {
			state.isAuthenticated = true;
		},
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = { access: "", refresh: "" };
    },
    finishInitialLoad: (state) => {
      state.isLoading = false;
    },
    setRegisterNumber: (state, action: PayloadAction<string>) => {
      state.registerNumber = action.payload;
    },
    setAccount: (state, action: PayloadAction<string>) => {
      state.account = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
	},
});

export const selectAccount = (state: RootState) => state.auth.account;
export const selectName = (state: RootState) => state.auth.name;

const selectToken = (state: RootState) => state.auth.token;

export const selectAccessToken = createSelector(
  selectToken,
  (token) => token.access
);

export const selectRefreshToken = createSelector(
  selectToken,
  (token) => token.refresh
);

export const { setAuth, setOnlyAuth, logout, finishInitialLoad, setRegisterNumber, setAccount, setName } = authSlice.actions;
export default authSlice.reducer;
