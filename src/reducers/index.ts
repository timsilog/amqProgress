import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import mediaReducer from './mediaReducer';

const combined = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  media: mediaReducer,
});

export type AppState = ReturnType<typeof combined>;

export default combined;