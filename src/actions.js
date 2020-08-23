import fetch from 'cross-fetch'
import snakeCaseKeys from 'snakecase-keys'

export const TOGGLE_VIDEO = 'TOGGLE_VIDEO'

export function toggleVideo(id) {
  return { type: TOGGLE_VIDEO, data: id }
}

export const REQUEST_VIDEOS = 'REQUEST_VIDEOS'
function requestVideos(channelId) {
  return {
    type: REQUEST_VIDEOS,
    channelId
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

export const REQUEST_VIDEO_ANALYSIS = 'REQUEST_VIDEO_ANALYSIS'
function requestVideoAnalysis(videoId) {
  return {
    type: REQUEST_VIDEO_ANALYSIS,
    videoId
  }
}

export const RECEIVE_VIDEO_ANALYSIS = 'RECEIVE_VIDEO_ANALYSIS'
function receiveVideoAnalysis(videoId, json) {
  return {
    type: RECEIVE_VIDEO_ANALYSIS,
    videoId,
    data: json
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

export const REQUEST_SYNC_VIDEO_AND_CLIPS = 'REQUEST_SYNC_VIDEO_AND_CLIPS'
export function requestSyncVideoAndClips(channelId) {
  return {
    type: REQUEST_SYNC_VIDEO_AND_CLIPS,
    channelId
  }
}

export const RECEIVE_SYNC_VIDEO_AND_CLIPS = 'RECEIVE_SYNC_VIDEO_AND_CLIPS'
export function receiveSyncVideoAndClips(channelId) {
  return {
    type: RECEIVE_SYNC_VIDEO_AND_CLIPS,
    channelId
  }
}

export const REQUEST_TAKE_EXPORT = 'REQUEST_TAKE_EXPORT'
export function requestTakeExport(exportSegments) {
  return {
    type: REQUEST_TAKE_EXPORT,
    exportSegments
  }
}

export const RECEIVE_TAKE_EXPORT = 'RECEIVE_TAKE_EXPORT'
export function receiveTakeExport(exportSegments, exportId) {
  return {
    type: RECEIVE_TAKE_EXPORT,
    exportSegments,
    exportId
  }
}

export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'

export const RECEIVE_EXPORT_STATUSES = 'RECEIVE_EXPORT_STATUSES'
export function receiveExportStatuses(data) {
  return {
    type: RECEIVE_EXPORT_STATUSES,
    data
  }
}

export const REQUEST_EXPORT_STATUSES = 'REQUEST_EXPORT_STATUSES'
export function requestExportStatuses() {
  return {
    type: REQUEST_EXPORT_STATUSES,
  }
}

export function syncVideoAndClips(channelId) {
  return function (dispatch) {
    dispatch(requestSyncVideoAndClips(channelId))
    return fetch("http://localhost:8080/videos/sync?channel_id=" + channelId, { mode: "cors", method: "POST"})
      .then(
        response => response.json()
        // Do not use catch, because errors occured during rendering
        // should be handled by React Error Boundaries
        // https://reactjs.org/docs/error-boundaries.html
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveSyncVideoAndClips(channelId))
      )
  }
}

export function analyseVideo(videoId) {
  return function (dispatch) {
    dispatch(requestVideoAnalysis(videoId))

    return fetch("http://localhost:8080/videos/" + videoId + "/analysis", { mode: "cors"})
      .then(response => {
        if(response.ok) { 
          return response.json()
        } else {
          throw new Error(response.json())
        }
      }
        // Do not use catch, because errors occured during rendering
        // should be handled by React Error Boundaries
        // https://reactjs.org/docs/error-boundaries.html
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveVideoAnalysis(videoId, json))
      )
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

export function fetchVideos(channelId) {
  return function (dispatch) {
    dispatch(requestVideos(channelId))

    return fetch("http://localhost:8080/videos?channel_id=" + channelId, { mode: "cors"})
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

export function updateExportStatuses() {
  return function(dispatch) {
    dispatch(requestExportStatuses())

    return fetch("http://localhost:8080/exports", { headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, mode: "cors", method: "GET" })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveExportStatuses(json))
      }
      )
  }
}

export function takeExport(videoId, exportSegments) {
  return function(dispatch) {
    dispatch(requestTakeExport(exportSegments))

    return fetch("http://localhost:8080/exports", { headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, mode: "cors", method: "POST", body: JSON.stringify( snakeCaseKeys({ videoId, exportSegments }) )})
      .then(response => {
        const json = response.json()
        if(response.ok) { 
          dispatch(receiveTakeExport(exportSegments, json.exportId))
          return { error: null, result: json }
        } else {
          return { error: json, result: null }
        }
      }
      )
  }
}
