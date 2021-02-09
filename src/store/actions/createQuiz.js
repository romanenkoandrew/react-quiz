import { ActionTypes } from "./ActionTypes";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";

export function createQuizQuestion(item) {
  return {
    type: ActionTypes.CREATE_QUIZ_QUESTION,
    item,
  };
}
export function resetQuizCreation() {
  return {
    type: ActionTypes.RESET_QUIZ_CREATION,
  };
}
export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    const state = getState().createQuiz;
    await axios.post(`${BASE_URL}quizes.json`, state.quiz);
    dispatch(resetQuizCreation());
  };
}
