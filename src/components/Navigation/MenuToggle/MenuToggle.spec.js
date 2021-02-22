import React from "react";
import { shallow } from "enzyme";
import MenuToggle from "./MenuToggle";

describe("MenuToggle component", () => {
  it("should render MenuToggle with props.isOpen", () => {
    const component = shallow(<MenuToggle isOpen={true} />);
    expect(component).toMatchSnapshot();
  });
  it("should render MenuToggle without props.isOpen", () => {
    const component = shallow(<MenuToggle isOpen={false} />);
    expect(component).toMatchSnapshot();
  });
});
