import React from 'react'
import Grid from '@material-ui/core/Grid';
import { SegmentCrop } from './SegmentCrop'

export default class SegmentCropList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      segmentCrops: []
    }
  }

  add(startTimestamp, endTimestamp) {
    this.setState((state) => ({...state, segmentCrops: [...state.segmentCrops, {
      startTimestamp, endTimestamp
    }]}))
  }

  render() {
    return (
      <Grid container spacing={1}>{this.state.segmentCrops.map((segmentCrop, i) => (
        <SegmentCrop key={i} classes={this.props.fixedHeightPaper} startTimestamp={segmentCrop.startTimestamp} endTimestamp={segmentCrop.endTimestamp} />
      ))}</Grid>
    )
  }
}
