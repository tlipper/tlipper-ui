import { connect } from 'react-redux'
import { toggleStream, fetchStreams } from '../actions'
import Streams from '../components/Streams'

const getVisibleStreams = (streams) => {
  return streams
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    streams: getVisibleStreams(state.streams),
    fixedHeightPaper: ownProps.fixedHeightPaper
  }
}

const mapDispatchToProps = dispatch => {
    return {
          onStreamClick: id => {
                  dispatch(toggleStream(id))
                },
          loadStreams: () => {
            dispatch(fetchStreams())
          }
        }
}

const VisibleStreams = connect(mapStateToProps, mapDispatchToProps)(Streams)

export default VisibleStreams
