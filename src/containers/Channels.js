import { connect } from 'react-redux'
import { ChannelsComponent } from '../components/ChannelsComponent'
import { fetchChannels, createChannel } from '../actions'
// import { fetchClips, updateVideoWindow } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    channels: state.channels,
    classes: ownProps.classes,
  }
}

const mapDispatchToProps = dispatch => {
    return {
          loadChannels: () => {
            dispatch(fetchChannels())
          },
          createChannel: (name) => {
            dispatch(createChannel(name))
          }
        }
}

const Channels = connect(mapStateToProps, mapDispatchToProps)(ChannelsComponent)

export default Channels
