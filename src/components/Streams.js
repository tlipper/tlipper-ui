import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Stream from './Stream'
import Grid from '@material-ui/core/Grid';

class Streams extends Component {
  constructor(props) {
    // ({streams, onStreamClick}) => (
		super(props);
		this.state = {
				streams: props.streams,
				onStreamClick: props.onStreamClick,
				loadStreams: props.loadStreams
		};
  }

  componentWillMount() {
    this.props.loadStreams()
  }

  render() {
    return (
      [...this.props.streams].sort((a, b) => new Date(b.published_at) - new Date(a.published_at)
      ).map((stream, index) => (
        <Grid key={index} item xs={12} md={6} lg={4}>
          <Stream {...stream} onClick={() => this.props.onStreamClick(stream.id)} fixedHeightPaper={this.props.fixedHeightPaper} />
        </Grid>
      ))
    )
  }
}

Streams.propTypes = {
  onStreamClick: PropTypes.func.isRequired,
  fixedHeightPaper: PropTypes.string.isRequired,
  streams: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			thumbnail_url: PropTypes.string.isRequired,
			published_at: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired
		})
	).isRequired,
}

export default Streams

