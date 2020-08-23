import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Channel from './Channel'
import { PaginatedList } from 'react-paginated-list'

class ChannelsComponent extends Component {
  constructor(props) {
		super(props);
		this.state = {
				stream: props.stream,
		};
  }

  componentDidMount() {
    this.props.loadChannels()
  }

  render() {
    return (
      <PaginatedList list={this.props.channels} itemsPerPage={6} renderList={(list) => (
        <Grid container spacing={1}>
          <>{list.map((channel, index) => (
            <Grid key={index} item xs={12} md={6}>
              <Channel {...channel} fixedHeightPaper={this.props.fixedHeightPaper} />
            </Grid>
          ))}</>
        </Grid>
      )} />
    )
  }
}

ChannelsComponent.propTypes = {
  channels: PropTypes.arrayOf(
		PropTypes.shape({
      display_name: PropTypes.string.isRequired 
    })
  )
}

export default ChannelsComponent
