import React, { Component } from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Link from '@material-ui/core/Link';
import Title from '../ui/Title';
import Paper from '@material-ui/core/Paper';
import ReactPlayer from 'react-player'
import Grid from '@material-ui/core/Grid';
import Channel from './Channel'
import { PaginatedList } from 'react-paginated-list'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

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
      name: PropTypes.string.isRequired 
    })
  )
}

export default ChannelsComponent
