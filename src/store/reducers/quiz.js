import { ActionTypes } from "../actions/ActionTypes";

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_QUIZES_START: {
      return { ...state, loading: true };
    }
    case ActionTypes.FETCH_QUIZES_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    case ActionTypes.FETCH_QUIZES_SUCCESS: {
      return { ...state, loading: false, quizes: action.quizes };
    }
    case ActionTypes.FETCH_QUIZES_BY_ID_SUCCESS: {
      return { ...state, loading: false, quiz: action.quiz };
    }
    case ActionTypes.QUIZ_SET_STATE: {
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };
    }
    case ActionTypes.FINISH_QUIZ: {
      return { ...state, isFinished: true };
    }
    case ActionTypes.QUIZ_NEXT_QUESTION: {
      return {
        ...state,
        answerState: null,
        activeQuestion: action.number,
      };
    }
    case ActionTypes.RETRY_QUIZ: {
      return {
        ...state,
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
      };
    }
    default:
      return state;
  }
};

export default quizReducer;
