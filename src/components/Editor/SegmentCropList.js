import React from 'react'
import Grid from '@material-ui/core/Grid';
import SegmentCrop from './SegmentCrop'
import Title from '../../ui/Title';

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

  _removeSegmentCrop(i) {
    this.setState((state) => {
      var newSegmentCrops = [...state.segmentCrops]
      newSegmentCrops.splice(i, 1)
      return {...state, segmentCrops: newSegmentCrops }
   })
  }

  render() {
    return (
      <Grid container spacing={1}>
        {this.state.segmentCrops.map((segmentCrop, i) => (
          <SegmentCrop key={i} destroy={() => this._removeSegmentCrop(i)} classes={this.props.classes} startTimestamp={segmentCrop.startTimestamp} endTimestamp={segmentCrop.endTimestamp} />
        ))}
      </Grid>
    )
  }
}
