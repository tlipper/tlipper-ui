import { connect } from 'react-redux'
import ChannelsComponent from '../components/ChannelsComponent'
import { fetchChannels } from '../actions'
// import { fetchClips, updateVideoWindow } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    channels: state.channels,
  }
}

const mapDispatchToProps = dispatch => {
    return {
          loadChannels: () => {
            dispatch(fetchChannels())
          }
        }
}

const Channels = connect(mapStateToProps, mapDispatchToProps)(ChannelsComponent)

export default Channels
