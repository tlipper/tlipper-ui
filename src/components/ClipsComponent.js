import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import Typography from '@material-ui/core/Typography';
// import Video from './Video'
// import Clip from './Clip'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
// import { PaginatedList } from 'react-paginated-list'
import Title from '../ui/Title'
import VideoEditor from './VideoEditor'
import { TwitchPlayer } from 'react-twitch-embed'

class ClipsComponent extends Component {
  constructor(props) {
		super(props);
    this.state = { heatmapReady: false }
    this.heatmapRef = React.createRef()
  }

  componentDidMount() {
    this.props.loadClips(this.props.videoId)
    this.props.analyseVideo(this.props.videoId)
    console.log(window.Twitch)
  }

  setPlayer(player) {
    this.setState((state) => ({...state, player: player}))
  }

  setHeatmapReady() {
    this.setState((state) => ({...state, heatmapReady: true}))
  }

  twitchPlayerReady(player) {
    this.heatmapRef.current.setPlayer(player)
  }

  render() {
    return this.props.video ? (
      <Grid container spacing={3}>
        {/*
        <Grid item xs={12} md={6}>
          <Video classes={this.props.classes} {...this.props.video} />
        </Grid>
        */}
        { this.state.heatmapReady ? (
          <Grid item xs={12} md={12}>
            <Paper className={this.props.classes.paper}>
              <Title>Video Editor</Title>
              <TwitchPlayer autoplay={false} width="100%" video={this.props.video.id} onReady={(player) => this.twitchPlayerReady(player)}/>
            </Paper>
          </Grid>
        ) : (<>Loading</>) }
        <VideoEditor videoId={this.props.video.id} takeExport={this.props.takeExport} classes={this.props.classes} onLoad={this.setHeatmapReady.bind(this)} ref={this.heatmapRef} timeline={this.props.video.analysis}/>
        {/*
        <Grid item xs={12}>
          <Typography variant="h5" color="textSecondary">
            Clips
          </Typography>
          <PaginatedList list={this.props.clips} itemsPerPage={6} renderList={(list) => (
            <Grid container spacing={1}>
              <>{list.map((clip, index) => (
                <Grid key={index} item xs={12} md={6}>
                  <Clip video={this.props.video} {...clip} classes={this.props.classes} />
                </Grid>
              ))}</>
            </Grid>
          )} />
        </Grid>
        */}
      </Grid>
    ) : (<div>Not found</div>)
  }
}

ClipsComponent.propTypes = {
  video: PropTypes.shape({
			id: PropTypes.string.isRequired,
			thumbnail_url: PropTypes.string.isRequired,
			published_at: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired
		}),
}

export default ClipsComponent
