import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import SegmentCrop from './SegmentCrop'
import { useDrop } from 'react-dnd';
import { DraggableItemTypes } from '../../Constants'

export const ExportBuilder = ({classes}) => {
  const [exportSegments, setExportSegments] = useState([])
  const [{isOver, canDrop}, drop] = useDrop({
    accept: DraggableItemTypes. SEGMENT_CROP,
    drop: (i, monitor) => {
      console.log(i)
      const s = i.startTimestamp
      const e = i.endTimestamp
      const newSegments = [...exportSegments, { startTimestamp: s, endTimestamp: e }]
      setExportSegments(newSegments)
      return { result: "whoa" }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  })

  const _removeExportSegment = (i) => {
    var newExportSegments = [...exportSegments]
    newExportSegments.splice(i, 1)
    setExportSegments(newExportSegments)
  }

  return (
    <Grid style={{minHeight: "150px", backgroundColor: isOver ? "red" : "white"}} ref={drop} container spacing={1}>
      {exportSegments.map((exportSegment, i) => (
        <SegmentCrop destroy={() => _removeExportSegment(i)} key={i} classes={classes} startTimestamp={exportSegment.startTimestamp} endTimestamp={exportSegment.endTimestamp} />
      ))}
    </Grid>
  )
}

