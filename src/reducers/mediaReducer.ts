import {
  SET_CURRENT_SONG,
  // SET_CURRENT_PLAYLIST,
  // maybe some sort of add to queue at certain location
  ActionType
} from '../actions/actionTypes';
import { Media } from '../types';

const initialState: Media = {
  currentSong: null,
}

export default (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload
      };
    default:
      return state;
  }
}