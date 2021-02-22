import React from "react";
import { shallow } from "enzyme";
import AnswerItem from "./AnswerItem";

describe("AnswerItem component", () => {
  it("should render AnswerItem with props.state", () => {
    const component = shallow(
      <AnswerItem state={true} answer={{ text: "test", id: "test" }} />
    );
    expect(component).toMatchSnapshot();
  });
  it("should render AnswerItem without props.state", () => {
    const component = shallow(
      <AnswerItem state={false} answer={{ text: "test", id: "test" }} />
    );
    expect(component).toMatchSnapshot();
  });
  it("should clicked AnswerItem", () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <AnswerItem
        onAnswerClick={mockCallBack}
        answer={{ text: "test", id: "test" }}
      />
    );
    component.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
