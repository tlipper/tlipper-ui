import React from 'react'
import { useDrag } from 'react-dnd';
import Paper from '@material-ui/core/Paper';
import { DraggableItemTypes } from '../../Constants'
import { secondsToStringTimestamp, secondsToStringDuration } from '../../Util'
import Grid from '@material-ui/core/Grid';

export const SegmentCrop = ({classes, startTimestamp, endTimestamp}) => {
	const [{ isDragging }, drag] = useDrag({
		item: { type: DraggableItemTypes.SEGMENT_CROP },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging()
		})
	})
  return (
    <a ref={drag} href="#example" style={{textDecoration: 'none', opacity: isDragging ? 0.5 : 1}} onClick={() => console.log("wow")}>
      <Grid item xs={12}>
        <Paper className={classes} style={{":hover": "pointer"}}>
          <span>
            {secondsToStringTimestamp(startTimestamp)}-{secondsToStringTimestamp(endTimestamp)} ({secondsToStringDuration(endTimestamp-startTimestamp)})
          </span>
        </Paper>
      </Grid>
    </a>
  )
}
