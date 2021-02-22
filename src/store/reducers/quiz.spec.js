import quizReducer, { initialState } from "./quiz";
import { ActionTypes } from "../actions/ActionTypes";

describe("quiz reducer", () => {
  it("should return the initial state", () => {
    expect(quizReducer(undefined, { type: "123", payload: "123" })).toEqual(
      initialState
    );
  });
  it("should handle FETCH_QUIZES_START", () => {
    expect(
      quizReducer(initialState, {
        type: ActionTypes.FETCH_QUIZES_START,
      })
    ).toEqual({ ...initialState, loading: true });
  });
  it("should handle FETCH_QUIZES_ERROR", () => {
    expect(
      quizReducer(initialState, {
        type: ActionTypes.FETCH_QUIZES_ERROR,
        error: "error message",
      })
    ).toEqual({ ...initialState, error: "error message" });
  });
  it("should handle FETCH_QUIZES_SUCCESS", () => {
    expect(
      quizReducer(initialState, {
        type: ActionTypes.FETCH_QUIZES_SUCCESS,
        quizes: [{ quizes: true }],
      })
    ).toEqual({ ...initialState, quizes: [{ quizes: true }] });
  });
  it("should handle FETCH_QUIZES_BY_ID_SUCCESS", () => {
    expect(
      quizReducer(initialState, {
        type: ActionTypes.FETCH_QUIZES_BY_ID_SUCCESS,
        quiz: { quiz: true },
      })
    ).toEqual({ ...initialState, quiz: { quiz: true } });
  });
  it("should handle QUIZ_SET_STATE", () => {
    expect(
      quizReducer(initialState, {
        type: ActionTypes.QUIZ_SET_STATE,
        answerState: { answerState: true },
        results: { results: true },
      })
    ).toEqual({
      ...initialState,
      answerState: { answerState: true },
      results: { results: true },
    });
  });
  it("should handle FINISH_QUIZ", () => {
    expect(
      quizReducer(initialState, {
        type: ActionTypes.FINISH_QUIZ,
      })
    ).toEqual({
      ...initialState,
      isFinished: true,
    });
  });
  it("should handle QUIZ_NEXT_QUESTION", () => {
    expect(
      quizReducer(initialState, {
        type: ActionTypes.QUIZ_NEXT_QUESTION,
        number: 23,
      })
    ).toEqual({
      ...initialState,
      answerState: null,
      activeQuestion: 23,
    });
  });
  it("should handle RETRY_QUIZ", () => {
    expect(
      quizReducer(initialState, {
        type: ActionTypes.RETRY_QUIZ,
      })
    ).toEqual({ ...initialState });
  });
});
