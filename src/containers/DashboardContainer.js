import { connect } from 'react-redux'
import DashboardComponent from '../components/DashboardComponent'

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    streams: state.streams,
  }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)

export default DashboardContainer

