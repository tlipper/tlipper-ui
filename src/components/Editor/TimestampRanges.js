import React from 'react'

export const TimestampRanges = ({start, end}) => (
  <div style={{position: "relative"}}>
    <div style={{float: "left"}}>{start}</div>
    <div style={{float: "right"}}>{end}</div>
  </div>
)
