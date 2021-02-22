import authReducer, { initialState } from "./auth";
import { ActionTypes } from "../actions/ActionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: "123", payload: "123" })).toEqual(
      initialState
    );
  });
  it("should handle AUTH_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: ActionTypes.AUTH_SUCCESS,
        token: "testToken",
      })
    ).toEqual({ token: "testToken" });
  });
  it("should handle AUTH_LOGOUT", () => {
    expect(
      authReducer(initialState, {
        type: ActionTypes.AUTH_LOGOUT,
      })
    ).toEqual({ token: null });
  });
});
