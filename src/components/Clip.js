import React from 'react'
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

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Clip = ({ fixedHeightPaper, vod_id, tracking_id, slug, created_at, embed_url }) => {
  const classes = useStyles();
  const embedUrlWithParent = embed_url + "&parent=localhost"
  return (
    <Paper className={fixedHeightPaper}>
      <div>
				<Title>{slug}</Title>
				<Typography color="textSecondary" className={classes.depositContext}>
					{new Date(created_at).toLocaleDateString()}
				</Typography>
				<Accordion TransitionProps={{ unmountOnExit: true }}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography className={classes.heading}>Show Clip</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<iframe style={{width: '100%', minHeight: '350px'}} src={embedUrlWithParent} />
					</AccordionDetails>
				</Accordion>
      </div>
    </Paper>
  )
}

Clip.propTypes = {
  tracking_id: PropTypes.string.isRequired,
}

export default Clip
