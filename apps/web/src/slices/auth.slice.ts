import {
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";
import { IUser } from "outline-challenge-shared/models";

interface AuthState {
  currentUser?: IUser;
}
const initialState = {};
export const authSlice = createSlice<
  AuthState,
  SliceCaseReducers<AuthState>,
  "auth",
  SliceSelectors<AuthState>
>({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (dashboard, action) => {
      dashboard.currentUser = action.payload;
    },
    loggedOut: (_dashboard, _action) => {
      return initialState;
    },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;

export const getCurrentUser = (state: any) => Boolean(state.auth.currentUser);
