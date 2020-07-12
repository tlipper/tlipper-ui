import React from 'react'
import PropTypes from 'prop-types'
import Deposits from '../ui/Deposits'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Title from '../ui/Title';

const Video = ({ onClick, id, title, thumbnail_url, published_at, url, fixedHeightPaper }) => {
  return (
    <Paper className={fixedHeightPaper}>
      <div
        onClick={onClick}
      >
        <Deposits link={"/videos/" + id} id={id} name={title} thumbnailUrl={thumbnail_url} publishedAt={published_at}/>
      </div>
    </Paper>
  )
}

Video.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default Video
