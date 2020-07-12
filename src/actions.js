import fetch from 'cross-fetch'

export const TOGGLE_VIDEO = 'TOGGLE_VIDEO'

export function toggleVideo(id) {
  return { type: TOGGLE_VIDEO, data: id }
}

export const REQUEST_VIDEOS = 'REQUEST_VIDEOS'
function requestVideos() {
  return {
    type: REQUEST_VIDEOS
  }
}

export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS'
function receiveVideos(json) {
  return {
    type: RECEIVE_VIDEOS,
    videos: json,
    receivedAt: Date.now()
  }
}

export const REQUEST_CLIPS = 'REQUEST_CLIPS'
function requestClips() {
  return {
    type: REQUEST_CLIPS
  }
}

export const RECEIVE_CLIPS = 'RECEIVE_CLIPS'
function receiveClips(json) {
  return {
    type: RECEIVE_CLIPS,
    clips: json,
    receivedAt: Date.now()
  }
}

export const REQUEST_CHANNELS = 'REQUEST_CHANNELS'
function requestChannels() {
  return {
    type: REQUEST_CHANNELS
  }
}

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS'
function receiveChannels(json) {
  return {
    type: RECEIVE_CHANNELS,
    channels: json,
    receivedAt: Date.now()
  }
}

export const UPDATE_VIDEO_WINDOW = 'UPDATE_VIDEO_WINDOW'
export function updateVideoWindow(timeRange) {
  return {
    type: UPDATE_VIDEO_WINDOW,
    start: timeRange.start,
    end: timeRange.end,
    meta: {
      throttle: 200
    }
  }
}

export function fetchChannels() {
  return function (dispatch) {
    dispatch(requestChannels())

    return fetch("http://localhost:8080/channels", { mode: "cors"})
      .then(
        response => response.json()
        // Do not use catch, because errors occured during rendering
        // should be handled by React Error Boundaries
        // https://reactjs.org/docs/error-boundaries.html
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveChannels(json))
      )
  }
}

export function fetchClips(videoId) {
  return function (dispatch) {
    dispatch(requestClips())

    return fetch("http://localhost:8080/videos/" + videoId + "/clips", { mode: "cors"})
      .then(
        response => response.json()
        // Do not use catch, because errors occured during rendering
        // should be handled by React Error Boundaries
        // https://reactjs.org/docs/error-boundaries.html
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveClips(json))
      )
  }
}

export function fetchVideos() {
  return function (dispatch) {
    dispatch(requestVideos())

    return fetch(`http://localhost:8080/videos`, { mode: "cors"})
      .then(
        response => response.json()
        // Do not use catch, because errors occured during rendering
        // should be handled by React Error Boundaries
        // https://reactjs.org/docs/error-boundaries.html
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveVideos(json))
      )
  }
}
