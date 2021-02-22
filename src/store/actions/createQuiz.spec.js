import * as actions from "./createQuiz";
import { ActionTypes } from "../actions/ActionTypes";
import configureStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import thunk from "redux-thunk";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore({ createQuiz: { quiz: {} } });

describe("createQuiz actions", () => {
  beforeEach(() => {
    store.clearActions();
  });
  it("should create an action CREATE_QUIZ_QUESTION", () => {
    const item = "testItem";
    const expectedAction = {
      type: ActionTypes.CREATE_QUIZ_QUESTION,
      item,
    };
    expect(actions.createQuizQuestion(item)).toEqual(expectedAction);
  });
  it("should create an action RESET_QUIZ_CREATION", () => {
    const expectedAction = {
      type: ActionTypes.RESET_QUIZ_CREATION,
    };
    expect(actions.resetQuizCreation()).toEqual(expectedAction);
  });
  it("should post quiz and  RESET_QUIZ_CREATION", () => {
    mock
      .onPost(`${BASE_URL}quizes.json`)
      .reply(201, { response: { item: "item1" } });

    return store.dispatch(actions.finishCreateQuiz()).then(() => {
      let expectedActions = [
        {
          type: ActionTypes.RESET_QUIZ_CREATION,
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
