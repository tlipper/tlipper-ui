import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Video from './Video'
import Grid from '@material-ui/core/Grid';
import { PaginatedList } from 'react-paginated-list'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class VideosComponent extends Component {
  constructor(props) {
		super(props);
		this.state = {
				videos: props.videos,
				onStreamClick: props.onStreamClick,
				loadVideos: props.loadVideos
		};
  }

  componentWillMount() {
    this.props.loadVideos()
  }

  render() {
    const sortedVideos = [...this.props.videos].sort((a, b) => new Date(b.published_at) - new Date(a.published_at)
      )
    return (
      <PaginatedList list={sortedVideos} itemsPerPage={6} renderList={(list) => (
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={3}>
            <Paper className={this.props.classes.paper}>
              <Button disabled={ this.props.isChannelBeingSynced } onClick={this.props.syncVideoAndClips} variant="contained" color="primary">
                { this.props.isChannelBeingSynced ? "Syncing the channel..." : "Sync Video & Clips" }
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <>{list.map((video, index) => (
                <Grid key={index} item xs={12} md={6} lg={4}>
                  <Video {...video} onClick={() => this.props.onStreamClick(video.id)} classes={this.props.classes} />
                </Grid>
              ))}</>
            </Grid>
          </Grid>
        </Grid>
      )} />
    )
  }
}

VideosComponent.propTypes = {
  onStreamClick: PropTypes.func.isRequired,
  videos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			thumbnail_url: PropTypes.string.isRequired,
			published_at: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired
		})
	).isRequired,
}

export default VideosComponent

