import { ActionTypes } from "../actions/ActionTypes";

export const initialState = {
  token: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AUTH_SUCCESS: {
      return { ...state, token: action.token };
    }
    case ActionTypes.AUTH_LOGOUT: {
      return { ...state, token: null };
    }
    default:
      return state;
  }
}

export default authReducer;
