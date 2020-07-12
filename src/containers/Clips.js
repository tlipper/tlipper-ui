import { connect } from 'react-redux'
import ClipsComponent from '../components/ClipsComponent'
import { fetchClips, updateVideoWindow } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    video: state.videos.find(v => v.id === ownProps.videoId),
    clips: state.clips,
    videoWindow: state.videoWindow,
    fixedHeightPaper: ownProps.fixedHeightPaper
  }
}

const mapDispatchToProps = dispatch => {
    return {
          loadClips: (videoId) => {
            dispatch(fetchClips(videoId))
          },
          updateVideoWindow: (timeRange) => {
            dispatch(updateVideoWindow(timeRange))
          }
        }
}

const Clips = connect(mapStateToProps, mapDispatchToProps)(ClipsComponent)

export default Clips
