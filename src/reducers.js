import { combineReducers } from 'redux'
import { RECEIVE_VIDEOS, RECEIVE_CLIPS, RECEIVE_CHANNELS, UPDATE_VIDEO_WINDOW, RECEIVE_VIDEO_ANALYSIS, REQUEST_SYNC_VIDEO_AND_CLIPS, RECEIVE_SYNC_VIDEO_AND_CLIPS } from './actions'

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

function videoClipSyncState(state = {}, action) {
    switch(action.type) {
      case REQUEST_SYNC_VIDEO_AND_CLIPS:
        return {...state, [action.channelId]: true }
      case RECEIVE_SYNC_VIDEO_AND_CLIPS:
        return {...state, [action.channelId]: false }
      default:
        return state;
    };
}

const twitchVodderApp = combineReducers({
  videos, clips, videoWindow, channels, videoClipSyncState
});

export default twitchVodderApp;
