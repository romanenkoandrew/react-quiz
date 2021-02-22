import React from "react";
import { shallow } from "enzyme";
import { QuizCreator } from "./QuizCreator";
import QuizCreatorConnect from "./QuizCreator";
import configureStore from "redux-mock-store";

const mockStore = configureStore();

describe("QuizCreator component", () => {
  let createQuizQuestion, finishCreateQuiz, component, instance;
  beforeEach(() => {
    createQuizQuestion = jest.fn();
    finishCreateQuiz = jest.fn();
    component = shallow(
      <QuizCreator
        quiz={[{ answers: "answers", question: "question" }]}
        createQuizQuestion={createQuizQuestion}
        finishCreateQuiz={finishCreateQuiz}
      />
    );
    instance = component.instance();
  });
  it("should render QuizCreator with props", () => {
    expect(component).toMatchSnapshot();
  });
  it("should call method onSubmitHandler in QuizCreator", () => {
    const e = { preventDefault: jest.fn() };
    instance.onSubmitHandler(e);
    expect(e.preventDefault).toBeCalledTimes(1);
  });
  it("should call method addQuestionHandler in QuizCreator", () => {
    const e = { preventDefault: jest.fn() };
    instance.addQuestionHandler(e);
    expect(e.preventDefault).toBeCalledTimes(1);
  });
  it("should call method createQuizHandler in QuizCreator", () => {
    const e = { preventDefault: jest.fn() };
    instance.createQuizHandler(e);
    expect(e.preventDefault).toBeCalledTimes(1);
  });
  it("should call method selectChangeHandler  in QuizCreator", () => {
    const e = { target: { value: 1 } };
    instance.selectChangeHandler(e);
    expect(instance.state.rightAnswerId).toBe(1);
  });
  it("should call method onChangeHandler in QuizCreator", () => {
    instance.setState({ formControls: { controlName: {} } });
    instance.onChangeHandler("value", "controlName");
    expect(instance.state.formControls.controlName.touched).toBe(true);
    expect(instance.state.formControls.controlName.value).toBe("value");
    expect(instance.state.formControls.controlName.valid).toBe(true);
    expect(instance.state.isFormValid).toBe(true);
  });
});

describe("QuizCreatorConnect component", () => {
  it("should props from store in QuizCreatorConnect", () => {
    const store = mockStore({ createQuiz: { quiz: {} } });
    const component = shallow(<QuizCreatorConnect store={store} />);
    expect(component.children().props().quiz).toBeTruthy();
  });
});
