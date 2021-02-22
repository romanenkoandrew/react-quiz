import React from "react";
import { shallow } from "enzyme";
import Drawer from "./Drawer";

describe("Drawer component", () => {
  it("should render Drawer without props", () => {
    const component = shallow(<Drawer />);
    expect(component).toMatchSnapshot();
  });
  it("should render Drawer with props", () => {
    const component = shallow(<Drawer isOpen isAuthenticated />);
    expect(component).toMatchSnapshot();
  });
});
