import createQuizReducer, { initialState } from "./createQuiz";
import { ActionTypes } from "../actions/ActionTypes";

describe("createQuiz reducer", () => {
  it("should return the initial state", () => {
    expect(
      createQuizReducer(undefined, { type: "123", payload: "123" })
    ).toEqual(initialState);
  });
  it("should handle CREATE_QUIZ_QUESTION", () => {
    expect(
      createQuizReducer(initialState, {
        type: ActionTypes.CREATE_QUIZ_QUESTION,
        item: { test: true },
      })
    ).toEqual({ quiz: [{ test: true }] });
  });
  it("should handle RESET_QUIZ_CREATION", () => {
    expect(
      createQuizReducer(initialState, {
        type: ActionTypes.RESET_QUIZ_CREATION,
      })
    ).toEqual({ quiz: [] });
  });
});
