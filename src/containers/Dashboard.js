import { connect } from 'react-redux'
import DashboardComponent from '../components/DashboardComponent'

const mapStateToProps = (state, ownProps) => {
  return {
    videos: state.videos,
  }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)

export default Dashboard

