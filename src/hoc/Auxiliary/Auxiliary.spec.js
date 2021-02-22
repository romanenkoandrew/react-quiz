import React from "react";
import { shallow } from "enzyme";
import Auxiliary from "./Auxiliary";

describe("AnswerItem component", () => {
  it("should render AnswerItem", () => {
    const component = shallow(<Auxiliary props={<div>test</div>} />);
    expect(component).toMatchSnapshot();
  });
});
