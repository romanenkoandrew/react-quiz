import { ActionTypes } from "../actions/ActionTypes";

export const initialState = {
  quiz: [],
};

const createQuizReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_QUIZ_QUESTION: {
      return { ...state, quiz: [...state.quiz, action.item] };
    }
    case ActionTypes.RESET_QUIZ_CREATION: {
      return { ...state, quiz: [] };
    }
    default:
      return state;
  }
};

export default createQuizReducer;
