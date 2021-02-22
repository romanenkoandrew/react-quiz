import React from "react";
import { shallow } from "enzyme";
import { App } from "./App";
import configureStore from "redux-mock-store";

const mockStore = configureStore();

describe("App component", () => {
  let autoLogin, component, instance;
  beforeEach(() => {
    autoLogin = jest.fn();
    component = shallow(<App autoLogin={autoLogin} />);
    instance = component.instance();
  });
  it("App component without authenticated", () => {
    expect(component).toMatchSnapshot();
  });
  it("App component with authenticated", () => {
    const component2 = shallow(<App autoLogin={autoLogin} isAuthenticated />);
    expect(component2).toMatchSnapshot();
  });
  it("should call autologin", () => {
    expect(autoLogin).toBeCalledTimes(1);
  });
});
