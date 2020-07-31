import { GET_ERRORS, CLEAR_ERRORS, ActionType } from "../actions/actionTypes";

const initialState = {};

export default function (state = initialState, action: ActionType) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}