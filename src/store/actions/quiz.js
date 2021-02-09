import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";
import { ActionTypes } from "./ActionTypes";

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(`${BASE_URL}quizes.json`);
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({ id: key, name: `Тест №${index + 1}` });
      });
      dispatch(fetchQuizesSuccess(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizById(id) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(`${BASE_URL}quizes/${id}.json`);
      const quiz = response.data;
      dispatch(fetchQuizByIdSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizesStart() {
  return {
    type: ActionTypes.FETCH_QUIZES_START,
  };
}
export function fetchQuizesSuccess(quizes) {
  return {
    type: ActionTypes.FETCH_QUIZES_SUCCESS,
    quizes,
  };
}
export function fetchQuizByIdSuccess(quiz) {
  return {
    type: ActionTypes.FETCH_QUIZES_BY_ID_SUCCESS,
    quiz,
  };
}
export function fetchQuizesError(error) {
  return {
    type: ActionTypes.FETCH_QUIZES_ERROR,
    error,
  };
}

export function quizSetState(answerState, results) {
  return {
    type: ActionTypes.QUIZ_SET_STATE,
    answerState,
    results,
  };
}
export function finishQuiz() {
  return {
    type: ActionTypes.FINISH_QUIZ,
  };
}
export function quizNextQuestion(number) {
  return {
    type: ActionTypes.QUIZ_NEXT_QUESTION,
    number,
  };
}

export function retryQuiz() {
  return {
    type: ActionTypes.RETRY_QUIZ,
  };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === "success") {
        return;
      }
    }
    const question = state.quiz[state.activeQuestion];
    const results = state.results;
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      dispatch(quizSetState({ [answerId]: "success" }, results));
      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 500);
    } else {
      results[question.id] = "error";
      dispatch(quizSetState({ [answerId]: "error" }, results));
    }
  };
  function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length;
  }
}
