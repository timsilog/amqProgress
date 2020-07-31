import { Song } from '../types';

export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const USER_LOADING = "USER_LOADING";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_CURRENT_SONG = "SET_CURRENT_SONG";

interface GetErrorsAction {
  type: typeof GET_ERRORS,
  payload: {
    [key: string]: string
  }
}

interface ClearErrorsAction {
  type: typeof CLEAR_ERRORS,
  payload: {}
}

interface UserLoadingAction {
  type: typeof USER_LOADING,
}

interface SetCurrentUserAction {
  type: typeof SET_CURRENT_USER,
  payload: any // decoded from jwt_decode()
}

interface SetCurrentSongAction {
  type: typeof SET_CURRENT_SONG,
  payload: Song
}

export type ActionType =
  GetErrorsAction |
  ClearErrorsAction |
  UserLoadingAction |
  SetCurrentUserAction |
  SetCurrentSongAction;