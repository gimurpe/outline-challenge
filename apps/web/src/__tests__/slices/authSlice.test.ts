import {
  authSlice,
  getCurrentUser,
  loggedIn,
  loggedOut,
} from "../../slices/auth.slice";
import { IUser } from "outline-challenge-shared/models";

const authReducer = authSlice.reducer;

describe("auth reducer", () => {
  const initialState = {};
  const mockUser: IUser = {
    id: "1",
    name: "Test User",
    email: "prologin_test@prologin.com",
    password: "ProLogin123456",
  };

  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle loggedIn", () => {
    const newState = authReducer(initialState, {
      type: loggedIn.type,
      payload: mockUser,
    });
    expect(newState).toEqual({ currentUser: mockUser });
  });

  it("should handle loggedOut", () => {
    const loggedInState = { currentUser: mockUser };
    const newState = authReducer(loggedInState, {
      type: loggedOut.type,
    });
    expect(newState).toEqual(initialState);
  });

  it("should return correct value from getCurrentUser", () => {
    const stateWithUser = { auth: { currentUser: mockUser } };
    const stateWithoutUser = { auth: {} };

    expect(getCurrentUser(stateWithUser)).toBe(true);
    expect(getCurrentUser(stateWithoutUser)).toBe(false);
  });
});
