import { connect } from 'react-redux'
import DashboardComponent from '../components/DashboardComponent'
import { updateExportStatuses } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    notifications: state.notifications,
    exports: state.exports,
  }
}

const mapDispatchToProps = dispatch => {
    return {
      updateExportStatuses: () => dispatch(updateExportStatuses()),
    }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)

export default Dashboard

