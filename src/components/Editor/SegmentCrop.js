import React from 'react'
import { useDrag } from 'react-dnd';
import Paper from '@material-ui/core/Paper';
import { DraggableItemTypes } from '../../Constants'
import { secondsToStringTimestamp, secondsToStringDuration } from '../../Util'
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';

const SegmentCrop = ({classes, startTimestamp, endTimestamp, destroy}) => {
	const [{ isDragging }, drag] = useDrag({
		item: { type: DraggableItemTypes.SEGMENT_CROP, startTimestamp, endTimestamp },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging()
		}),
    end: (i, monitor) => {
      if(monitor.didDrop()) {
        destroy()
      }
    }
	})
  return (
    <Grid item xs={12} md={6} lg={3} ref={drag} href="#example" style={{textDecoration: 'none', opacity: isDragging ? 0.5 : 1}} onClick={() => console.log("wow")}>
      <Paper className={`${classes.paper} ${classes.pointed}`}>
        <Grid container spacing={0}>
          <Grid item xs={11}>
            <span>
              {secondsToStringTimestamp(startTimestamp)}-{secondsToStringTimestamp(endTimestamp)} ({secondsToStringDuration(endTimestamp-startTimestamp)})
            </span>
          </Grid>
          <Grid item xs={1}>
            <CloseIcon className={`${classes.pointed} ${classes.grayOnHover}`} onClick={destroy} fontSize="small"/>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default (SegmentCrop)
