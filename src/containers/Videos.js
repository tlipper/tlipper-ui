import { connect } from 'react-redux'
import { toggleVideo, fetchVideos } from '../actions'
import VideosComponent from '../components/VideosComponent'

const getVideos = (channel_id, videos) => {
  return videos.filter(s => s.user_id === channel_id)
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    videos: getVideos(ownProps.channelId, state.videos),
    fixedHeightPaper: ownProps.fixedHeightPaper
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
          onStreamClick: id => {
                  dispatch(toggleVideo(id))
                },
          loadVideos: () => {
            dispatch(fetchVideos(ownProps.channelId))
          }
        }
}

const Videos = connect(mapStateToProps, mapDispatchToProps)(VideosComponent)

export default Videos
