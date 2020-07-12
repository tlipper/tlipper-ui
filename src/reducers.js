import { combineReducers } from 'redux'
import { RECEIVE_STREAMS, RECEIVE_CLIPS, UPDATE_VIDEO_WINDOW } from './actions'

function clips(state = [], action) {
  switch(action.type) {
    case RECEIVE_CLIPS:
      return action.clips
    default:
      return state;
  }
}

function videoWindow(state = {start: 0, end: 0}, action) {
  switch(action.type) {
    case UPDATE_VIDEO_WINDOW:
      return {...state, start: action.start, end: action.end}
    default:
      return state;
  }
}

function streams(state = [], action) {
  switch(action.type) {
    case RECEIVE_STREAMS:
      return action.streams
    default:
      return state;
  }
}

const twitchVodderApp = combineReducers({
  streams, clips, videoWindow
});

export default twitchVodderApp;
