import React from "react";
import { shallow } from "enzyme";
import FinishedQuiz from "./FinishedQuiz";

describe("FinishedQuiz component", () => {
  it("should render FinishedQuiz", () => {
    const component = shallow(
      <FinishedQuiz
        results={{ 1: "success", 2: "error" }}
        quiz={[
          { id: 1, question: "question" },
          { id: 2, question: "question2" },
        ]}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
