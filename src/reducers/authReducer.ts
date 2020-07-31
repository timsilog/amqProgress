import {
  SET_CURRENT_USER,
  USER_LOADING,
  ActionType
} from "../actions/actionTypes";
import { Auth } from '../types';
import isEmpty from 'is-empty';

const initialState: Auth = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}