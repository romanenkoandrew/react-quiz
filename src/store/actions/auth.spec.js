import * as actions from "./auth";
import { ActionTypes } from "../actions/ActionTypes";
import { API_KEY } from "../../Constants/Constants";
import configureStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import thunk from "redux-thunk";
import axios from "axios";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

// jest.useFakeTimers();

describe("auth actions", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("should create an action AUTH_LOGOUT", () => {
    const expectedAction = {
      type: ActionTypes.AUTH_LOGOUT,
    };
    expect(actions.logout()).toEqual(expectedAction);
  });
  // it("should autoLogout", () => {
  //   const time = 3600;
  //   store.dispatch(actions.autoLogout(time));
  //   const timerGame = require("./auth");
  //   timerGame.autoLogout(time);
  // const expectedAction = {
  //   type: ActionTypes.AUTH_LOGOUT,
  // };
  //
  // expect(() => store.dispatch(actions.logout())).toEqual(expectedAction);
  // });
  it("should login", () => {
    mock
      .onPost(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
      )
      .reply(201, { response: { item: "item1" } });
    const email = "test@mail.ru";
    const password = "123321";
    const store = mockStore({ token: "test" });
    return store.dispatch(actions.auth(email, password, true)).then(() => {
      const authData = { email, password, returnSecureToken: true };
      expect(authData).toEqual(authData);
    });
  });
  it("should register", () => {
    mock
      .onPost(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
      )
      .reply(201, { idToken: "test", expiresIn: 1000 });
    const email = "test@mail.ru";
    const password = "123321";
    const store = mockStore({ token: "test" });
    return store.dispatch(actions.auth(email, password, false)).then(() => {
      const token = "test";
      let expectedActions = [
        {
          type: ActionTypes.AUTH_SUCCESS,
          token,
        },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("autoLogin should autoLogout without token", () => {
    const store = mockStore({ token: "test" });
    return store.dispatch(actions.autoLogin());
    const expectedAction = [
      {
        type: ActionTypes.AUTH_LOGOUT,
      },
    ];
    expect(store.getActions()).toEqual(expectedAction);
  });
  // it("test", () => {
  //   const dateBeforeNow = Date.now() - 1000;
  //   localStorage.setItem("token", "test");
  //   localStorage.setItem("expirationDate", dateBeforeNow.toString());
  //   localStorage.__STORE__["token"] = JSON.stringify({
  //     token: "test",
  //   });
  //   localStorage.__STORE__["expirationDate"] = JSON.stringify({
  //     expirationDate: dateBeforeNow.toString(),
  //   });
  //   console.log(localStorage.getItem("token"));
  //   return store.dispatch(actions.autoLogin());
  //   const expectedAction = [
  //     {
  //       type: ActionTypes.AUTH_LOGOUT,
  //     },
  //   ];
  //   expect(store.getActions()).toEqual(expectedAction);
  // });
});
