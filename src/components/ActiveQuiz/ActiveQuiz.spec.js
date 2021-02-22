import React from "react";
import { shallow } from "enzyme";
import ActiveQuiz from "./ActiveQuiz";

describe("ActiveQuiz component", () => {
  it("should render ActiveQuiz with props.state", () => {
    const component = shallow(
      <ActiveQuiz
        answerNumber={1}
        quizLength={3}
        question={"question"}
        state={true}
        answers={[{ answer: { text: "test", id: "test" } }]}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
