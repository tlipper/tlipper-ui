import React from 'react'
import PropTypes from 'prop-types'
import Deposits from '../ui/Deposits'
import Paper from '@material-ui/core/Paper';

const Channel = ({ id, display_name, thumbnail_url, classes }) => {
  return (
    <Paper className={classes.paper}>
      <Deposits link={"/channels/" + id + "/videos"} name={display_name} thumbnailUrl={thumbnail_url} />
    </Paper>
  )
}

Channel.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Channel

