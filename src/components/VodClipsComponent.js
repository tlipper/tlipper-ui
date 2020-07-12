import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import Stream from './Stream'
import Clip from './Clip'
import Grid from '@material-ui/core/Grid';
import VideoEditor from '../components/Media/VideoEditor';
import Paper from '@material-ui/core/Paper';
import { PaginatedList } from 'react-paginated-list'
import Title from '../ui/Title';

class VodClipsComponent extends Component {
  constructor(props) {
		super(props);
		this.state = {
				stream: props.stream,
		};
  }

  componentDidMount() {
    this.props.loadClips(this.props.videoId)
  }

  render() {
    return this.props.stream ? (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stream fixedHeightPaper={this.props.fixedHeightPaper} {...this.props.stream} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={this.props.fixedHeightPaper}>
            <Title>Video Editor</Title>
            <VideoEditor src="https://twitch-vodder-mpeg.s3.eu-west-2.amazonaws.com/193e28463f313a8f4279_asmongold_39118384528_1513863767.mp4" preload={true} muted={false} onUpdate={this.props.updateVideoWindow}  />
            <br />Start: { this.props.videoWindow.start }
            <br />End: { this.props.videoWindow.end }
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" color="textSecondary">
            Clips
          </Typography>
          <PaginatedList list={this.props.clips} itemsPerPage={6} renderList={(list) => (
            <Grid container spacing={1}>
              <>{list.map((clip, index) => (
                <Grid key={index} item xs={12} md={6}>
                  <Clip vod_id={this.props.stream.id} {...clip} fixedHeightPaper={this.props.fixedHeightPaper} />
                </Grid>
              ))}</>
            </Grid>
          )} />
        </Grid>
      </Grid>
    ) : (<div>Not found</div>)
  }
}

VodClipsComponent.propTypes = {
  stream: PropTypes.shape({
			id: PropTypes.string.isRequired,
			thumbnail_url: PropTypes.string.isRequired,
			published_at: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired
		}),
}

export default VodClipsComponent
