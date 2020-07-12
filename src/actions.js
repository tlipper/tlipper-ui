import fetch from 'cross-fetch'

export const TOGGLE_STREAM = 'TOGGLE_STREAM'

export function toggleStream(id) {
  return { type: TOGGLE_STREAM, data: id }
}

export const REQUEST_STREAMS = 'REQUEST_STREAMS'
function requestStreams() {
  return {
    type: REQUEST_STREAMS
  }
}

export const RECEIVE_STREAMS = 'RECEIVE_STREAMS'
function receiveStreams(json) {
  return {
    type: RECEIVE_STREAMS,
    streams: json,
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

export function fetchStreams() {
  return function (dispatch) {
    dispatch(requestStreams())

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

        dispatch(receiveStreams(json))
      )
  }
}
