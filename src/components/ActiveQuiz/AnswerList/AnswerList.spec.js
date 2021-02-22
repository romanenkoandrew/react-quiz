import React from "react";
import { shallow } from "enzyme";
import AnswerList from "./AnswerList";

describe("AnswerList component", () => {
  it("should render AnswerList with props.state", () => {
    const component = shallow(
      <AnswerList
        state={true}
        answers={[{ answer: { text: "test", id: "test" } }]}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("should render AnswerList without props.state", () => {
    const component = shallow(
      <AnswerList
        state={false}
        answers={[{ answer: { text: "test", id: "test" } }]}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
