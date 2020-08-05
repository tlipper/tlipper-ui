import { connect } from 'react-redux'
import ClipsComponent from '../components/ClipsComponent'
import { fetchClips, updateVideoWindow, analyseVideo } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    video: state.videos.find(v => v.id === ownProps.videoId),
    clips: state.clips,
    videoWindow: state.videoWindow,
    classes: ownProps.classes,
  }
}

const mapDispatchToProps = dispatch => {
    return {
          loadClips: (videoId) => {
            dispatch(fetchClips(videoId))
          },
          updateVideoWindow: (timeRange) => {
            dispatch(updateVideoWindow(timeRange))
          },
          analyseVideo: (videoId) => {
            dispatch(analyseVideo(videoId))
          }
        }
}

const Clips = connect(mapStateToProps, mapDispatchToProps)(ClipsComponent)

export default Clips
