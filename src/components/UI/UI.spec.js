import React from "react";
import { shallow } from "enzyme";
import Backdrop from "./Backdrop/Backdrop";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Select from "./Select/Select";
import Input from "./Input/Input";

describe("Backdrop component", () => {
  it("should render Backdrop with props.isOpen", () => {
    const component = shallow(<Backdrop />);
    expect(component).toMatchSnapshot();
  });
});
describe("Button component", () => {
  it("should render Button", () => {
    const component = shallow(<Button />);
    expect(component).toMatchSnapshot();
  });
});
describe("Loader component", () => {
  it("should render Loader", () => {
    const component = shallow(<Loader />);
    expect(component).toMatchSnapshot();
  });
});
describe("Select component", () => {
  it("should render Select", () => {
    const component = shallow(
      <Select options={[{ value: "value ", text: "text" }]} />
    );
    expect(component).toMatchSnapshot();
  });
});
describe("Input component", () => {
  it("should render default Input", () => {
    const component = shallow(
      <Input
        type={"type"}
        value={"value"}
        errorMessage={"errorMessage "}
        valid
        touched
        shouldValidate
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("should render Input without props.type", () => {
    const component = shallow(
      <Input value={"value"} valid={false} touched shouldValidate />
    );
    expect(component).toMatchSnapshot();
  });
});
