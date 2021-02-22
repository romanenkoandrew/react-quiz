import * as actions from "./quiz";
import { ActionTypes } from "../actions/ActionTypes";
import { BASE_URL } from "../../Constants/Constants";
import configureStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import thunk from "redux-thunk";
import axios from "axios";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

describe("quiz actions", () => {
  beforeEach(() => {
    const store = mockStore();
    store.clearActions();
  });

  it("should create an action FINISH_QUIZ", () => {
    const expectedAction = {
      type: ActionTypes.FINISH_QUIZ,
    };
    expect(actions.finishQuiz()).toEqual(expectedAction);
  });

  it("should create an action QUIZ_NEXT_QUESTION", () => {
    const number = 23;
    const expectedAction = {
      type: ActionTypes.QUIZ_NEXT_QUESTION,
      number,
    };
    expect(actions.quizNextQuestion(number)).toEqual(expectedAction);
  });

  it("should create an action RETRY_QUIZ", () => {
    const expectedAction = {
      type: ActionTypes.RETRY_QUIZ,
    };
    expect(actions.retryQuiz()).toEqual(expectedAction);
  });

  it("dispatches FETCH_QUIZES_ERROR after a FAILED API fetchQuizes request", () => {
    mock.onGet(`${BASE_URL}quizes.json`).reply(404, { error: "test" });
    const store = mockStore();
    return store.dispatch(actions.fetchQuizes()).then(() => {
      const error = { error: "test" };
      let expectedActions = [
        {
          type: ActionTypes.FETCH_QUIZES_START,
        },
        {
          type: ActionTypes.FETCH_QUIZES_ERROR,
          error,
        },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("dispatches FETCH_QUIZES_SUCCESS after a successful API fetchQuizes request", () => {
    mock.onGet(`${BASE_URL}quizes.json`).reply(200, {
      quizes: [{ name: "Тест №1" }],
    });
    const store = mockStore();
    return store.dispatch(actions.fetchQuizes()).then(() => {
      let expectedActions = [
        {
          type: ActionTypes.FETCH_QUIZES_START,
        },
        {
          type: ActionTypes.FETCH_QUIZES_SUCCESS,
          quizes: [{ name: "Тест №1", id: "quizes" }],
        },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("dispatches FETCH_QUIZES_BY_ID_SUCCESS after a successful API fetchQuizById request", () => {
    mock
      .onGet(`${BASE_URL}quizes/1.json`)
      .reply(200, [{ name: "Тест №1", id: "1" }]);
    const store = mockStore();
    return store.dispatch(actions.fetchQuizById(1)).then(() => {
      let expectedActions = [
        {
          type: ActionTypes.FETCH_QUIZES_START,
        },
        {
          type: ActionTypes.FETCH_QUIZES_BY_ID_SUCCESS,
          quiz: [{ name: "Тест №1", id: "1" }],
        },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("dispatches FETCH_QUIZES_BY_ID_SUCCESS after a FAILED API fetchQuizById request", () => {
    mock.onGet(`${BASE_URL}quizes/1.json`).reply(400, { error: "test" });
    const store = mockStore();
    return store.dispatch(actions.fetchQuizById(1)).then(() => {
      const error = { error: "test" };
      let expectedActions = [
        {
          type: ActionTypes.FETCH_QUIZES_START,
        },
        {
          type: ActionTypes.FETCH_QUIZES_ERROR,
          error,
        },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("if answerState contain success in quizAnswerClick", () => {
    const store = mockStore({
      quiz: { answerState: ["success"], activeQuestion: 1, results: {} },
    });

    return store.dispatch(actions.quizAnswerClick(1));
    let expectedActions = [
      {
        type: ActionTypes.QUIZ_SET_STATE,
        payload: ({ 1: "success" }, { id: 1 }),
      },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("if question.rightAnswerId === answerId in quizAnswerClick", () => {
    const store = mockStore({
      quiz: {
        quiz: [{ rightAnswerId: 1, id: 1 }],
        answerState: [],
        activeQuestion: 0,
        results: {},
      },
    });

    return store.dispatch(actions.quizAnswerClick(1));
    let expectedActions = [
      {
        type: ActionTypes.QUIZ_SET_STATE,
        payload: ({ 1: "success" }, { id: 1 }),
      },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("if question.rightAnswerId !== answerId in quizAnswerClick", () => {
    const store = mockStore({
      quiz: {
        quiz: [{ rightAnswerId: 1, id: 1 }],
        answerState: [],
        activeQuestion: 0,
        results: {},
      },
    });
    return store.dispatch(actions.quizAnswerClick(2));
  });
});
