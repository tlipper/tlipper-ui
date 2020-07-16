import { combineReducers } from 'redux'
import { RECEIVE_VIDEOS, RECEIVE_CLIPS, RECEIVE_CHANNELS, UPDATE_VIDEO_WINDOW, RECEIVE_VIDEO_ANALYSIS } from './actions'

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

function channels(state = [], action) {
  switch(action.type) {
    case RECEIVE_CHANNELS:
      return action.channels
    default:
      return state;
  }
}

function videos(state = [], action) {
  switch(action.type) {
    case RECEIVE_VIDEOS:
      return action.videos
    case RECEIVE_VIDEO_ANALYSIS:
      return state.map(v => v.id == action.videoId ? {...v, analysis: action.data} : v)
    default:
      return state;
  }
}

const twitchVodderApp = combineReducers({
  videos, clips, videoWindow, channels
});

export default twitchVodderApp;
