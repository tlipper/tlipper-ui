import React, { useState, useEffect, useRef } from 'react'
import Grid from '@material-ui/core/Grid';
import SegmentCrop from './SegmentCrop'
import { useDrop } from 'react-dnd';
import { DraggableItemTypes } from '../../Constants'
import { secondsToStringTimestamp, secondsToStringDuration } from '../../Util'

const TIMELINE_HEIGHT = 100
const TIMELINE_TIMESTAMPS_HEIGHT = 20
const DROP_ZONE_WIDTH = 40

export const useContainerDimensions = myRef => {
  const getDimensions = () => ({
    width: myRef.current.offsetWidth,
    height: myRef.current.offsetHeight
  })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};

const TimelineSegment = ({classes, width, startTimestamp, endTimestamp}) => {
  return (<div style={{backgroundColor: "#6DF3F3", padding: "10px", height: TIMELINE_HEIGHT, width: width}}>
    <span>
      {secondsToStringTimestamp(startTimestamp)}-{secondsToStringTimestamp(endTimestamp)} ({secondsToStringDuration(endTimestamp-startTimestamp)})
    </span>
  </div>)
}

const DropZone = ({classes, timestamp, addExportSegment}) => {
  const [hoveredSegment, setHoveredSegment] = useState(null)
  const [{isOver, canDrop}, drop] = useDrop({
    accept: DraggableItemTypes. SEGMENT_CROP,
    drop: (item, monitor) => {
      console.log(item)
      addExportSegment(item)
      return { result: "whoa" }
    },
    hover: (item, monitor) => {
      setHoveredSegment(item)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  })

  return (
    <div style={{height: TIMELINE_HEIGHT + TIMELINE_TIMESTAMPS_HEIGHT}}>
      <div ref={drop} style={{backgroundColor: "gray", height: TIMELINE_HEIGHT, width: DROP_ZONE_WIDTH}} />
      <div style={{height: TIMELINE_TIMESTAMPS_HEIGHT, width: DROP_ZONE_WIDTH}} >
        <span style={{fontSize: 10}}>{secondsToStringTimestamp(timestamp)}</span>
      </div>
    </div>
    // { isOver && hoveredSegment ? (
    //   <TimelineSegment classes={classes} width={"20%"} startTimestamp={hoveredSegment.startTimestamp} endTimestamp={hoveredSegment.endTimestamp} />
    // ) : (<></>) }
  )
}

const duration = (exportSegment) => (exportSegment.endTimestamp - exportSegment.startTimestamp)

const computeWidth = (timelineWidth, exportSegment, exportSegments) => {
  console.log(timelineWidth)
  console.log(exportSegments.length + 1)
  console.log(duration(exportSegment))
  console.log(exportSegments)
  console.log(exportSegments.reduce((a, exportSegment) => a + duration(exportSegment), 0))
  const res = ((timelineWidth - (exportSegments.length + 1) * DROP_ZONE_WIDTH) * duration(exportSegment) / exportSegments.reduce((a, exportSegment) => a + duration(exportSegment), 0))
  console.log(res)
  return res
}

const durations = (exportSegments) => exportSegments.reduce((a, exportSegment) => a + duration(exportSegment), 0)

const durationsUntil = (exportSegments, index) => durations(exportSegments.slice(0, index + 1))

export const ExportBuilder = ({classes}) => {
  const [exportSegments, setExportSegments] = useState([])
  const componentRef = useRef()
  const { width, height } = useContainerDimensions(componentRef)

  const addExportSegment = (item, index) => {
    const s = item.startTimestamp
    const e = item.endTimestamp
    const newSegment = { startTimestamp: s, endTimestamp: e }
    var newSegments = [...exportSegments]
    newSegments.splice(index, 0, newSegment) 
    setExportSegments(newSegments)
  }

  const _removeExportSegment = (index) => {
    var newExportSegments = [...exportSegments]
    newExportSegments.splice(index, 1)
    setExportSegments(newExportSegments)
  }

  return (
    <Grid ref={componentRef} style={{minHeight: TIMELINE_HEIGHT + TIMELINE_TIMESTAMPS_HEIGHT, backgroundColor: "#DDD"}} container spacing={1}>
      <DropZone timestamp={0} addExportSegment={(item) => addExportSegment(item, 0)} />
      {exportSegments.map((exportSegment, index) => (
        <React.Fragment key={index}>
          <TimelineSegment width={computeWidth(width, exportSegment, exportSegments) + "px"} destroy={() => _removeExportSegment(index)} key={index} classes={classes} startTimestamp={exportSegment.startTimestamp} endTimestamp={exportSegment.endTimestamp} />
          <DropZone timestamp={index == 0 ? duration(exportSegment) : durationsUntil(exportSegments, index)} addExportSegment={(item) => addExportSegment(item, index + 1)} />
        </React.Fragment>
      ))}
    </Grid>
  )
}

