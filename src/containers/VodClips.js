import { connect } from 'react-redux'
import VodClipsComponent from '../components/VodClipsComponent'
import { fetchClips, updateVideoWindow } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams.find(s => s.id === ownProps.videoId),
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

const VodClips = connect(mapStateToProps, mapDispatchToProps)(VodClipsComponent)

export default VodClips

