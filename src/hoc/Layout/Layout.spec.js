import React from "react";
import { shallow } from "enzyme";
import { Layout } from "./Layout";
import LayoutConnect from "./Layout";
import configureStore from "redux-mock-store";

const mockStore = configureStore();

describe("Layout component", () => {
  let component, instance;
  beforeEach(() => {
    component = shallow(<Layout children={<div>Test</div>} />);
    instance = component.instance();
  });
  it("should render Layout", () => {
    expect(component).toMatchSnapshot();
  });
  it("Layout method onToggle", () => {
    expect(instance.state.menu).toBe(false);
    instance.onToggle();
    expect(instance.state.menu).toBe(true);
  });
  it("Layout method menuCloseHandler", () => {
    instance.setState({ menu: true });
    expect(instance.state.menu).toBe(true);
    instance.menuCloseHandler();
    expect(instance.state.menu).toBe(false);
  });
  it("should isAuthenticated in Layout props", () => {
    const store = mockStore({
      isAuthenticated: true,
      auth: { token: "" },
    });
    const component2 = shallow(
      <LayoutConnect store={store} children={<div>Test</div>} />
    );
    expect(component2.children().props().isAuthenticated).toBe(false);
  });
});
