import React from "react";
import { shallow } from "enzyme";
import { Quiz } from "./Quiz";
import QuizConnect from "./Quiz";
import configureStore from "redux-mock-store";

const mockStore = configureStore();

describe("Quiz component", () => {
  let fetchQuizById, quizAnswerClick, retryQuiz;
  beforeEach(() => {
    fetchQuizById = jest.fn();
    quizAnswerClick = jest.fn();
    retryQuiz = jest.fn();
  });
  it("should render Quiz with props", () => {
    const component = shallow(
      <Quiz
        results={[]}
        quiz={[{ answers: "answers", question: "question" }]}
        isFinished={false}
        loading={false}
        activeQuestion={0}
        answerState={{ state: "state" }}
        match={{ params: { id: 0 } }}
        fetchQuizById={fetchQuizById}
        quizAnswerClick={quizAnswerClick}
        retryQuiz={retryQuiz}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("should render Quiz with loading true", () => {
    const component = shallow(
      <Quiz
        results={[]}
        quiz={[{ answers: "answers", question: "question" }]}
        isFinished={false}
        loading={true}
        activeQuestion={0}
        answerState={{ state: "state" }}
        match={{ params: { id: 0 } }}
        fetchQuizById={fetchQuizById}
        quizAnswerClick={quizAnswerClick}
        retryQuiz={retryQuiz}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("should render Quiz with isFinished true", () => {
    const component = shallow(
      <Quiz
        results={[]}
        quiz={[{ answers: "answers", question: "question" }]}
        isFinished={true}
        loading={false}
        activeQuestion={0}
        answerState={{ state: "state" }}
        match={{ params: { id: 0 } }}
        fetchQuizById={fetchQuizById}
        quizAnswerClick={quizAnswerClick}
        retryQuiz={retryQuiz}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("should call the mock retry quiz function", () => {
    const component = shallow(
      <Quiz
        results={[]}
        quiz={[{ answers: "answers", question: "question" }]}
        isFinished={true}
        loading={false}
        activeQuestion={0}
        answerState={{ state: "state" }}
        match={{ params: { id: 0 } }}
        fetchQuizById={fetchQuizById}
        quizAnswerClick={quizAnswerClick}
        retryQuiz={retryQuiz}
      />
    );
    component.unmount();
    expect(retryQuiz.mock.calls.length).toBe(1);
  });
  it("should props from store in Quiz", () => {
    const store = mockStore({
      quiz: {
        results: [],
        quiz: [{ answers: "answers", question: "question" }],
        isFinished: true,
        loading: false,
        activeQuestion: 0,
        answerState: { state: "state" },
        match: { params: { id: 0 } },
        fetchQuizById: fetchQuizById,
        quizAnswerClick: quizAnswerClick,
        retryQuiz: retryQuiz,
      },
    });
    const component2 = shallow(<QuizConnect store={store} />);
    expect(component2.children().props().results).toBeTruthy();
    expect(component2.children().props().quiz).toBeTruthy();
  });
  //   it("should roll the dice again when button is clicked", () => {
  //     const store = mockStore({
  //       quiz: {
  //         results: [],
  //         quiz: [{ answers: "answers", question: "question" }],
  //         isFinished: true,
  //         loading: false,
  //         activeQuestion: 0,
  //         answerState: { state: "state" },
  //         match: { params: { id: 0 } },
  //         fetchQuizById: fetchQuizById,
  //         quizAnswerClick: quizAnswerClick,
  //         retryQuiz: retryQuiz,
  //       },
  //     });
  //     const component2 = shallow(<QuizConnect store={store} />);
  //     component2.simulate("retryQuiz");
  //
  //     const actions = store.getActions();
  //     return console.log(component2.simulate("retryQuiz"));
  //     // expect(actions).toEqual([{ type: ActionTypes.RETRY_QUIZ }]);
  //   });
});
