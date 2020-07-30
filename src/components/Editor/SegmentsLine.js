import React from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SelectorOverlay from './SelectorOverlay'
import { MODE_ZOOM } from './Constants'
import { TimestampRanges } from './TimestampRanges'
import { secondsToStringTimestamp } from '../../Util'

export default class SegmentsLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = { mode: MODE_ZOOM } // Can be "crop" or "zoom"
    this.segmentsBarRef = React.createRef()
    this.selectorOverlayRef = React.createRef()
  }

  componentDidMount() {
  }

  changeModeButtonClicked() {
    this.setState({ mode: this.selectorOverlayRef.current.changeMode() })
  }

  resetZoomButtonClicked() {
    this.props.resetZoom()
    this.selectorOverlayRef.current.clearSelection()
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={4} lg={2}>
          <Button fullWidth onClick={this.changeModeButtonClicked.bind(this)} variant="contained" color="primary">Mode: {this.state.mode}</Button>
        </Grid>
        <Grid item xs={12} md={4} lg={2}>
          <Button fullWidth onClick={this.resetZoomButtonClicked.bind(this)} variant="contained" color="primary">Reset Zoom</Button>
        </Grid>
        <Grid item xs={12}>
          <div style={{position: "relative", height: 60, paddingBottom: 20}}>
            <SelectorOverlay ref={this.selectorOverlayRef} segmentsBarRef={this.segmentsBarRef} onZoom={this.props.onZoom} onSelectRange={this.props.onSelectRange.bind(this)}/>
            <div ref={this.segmentsBarRef} style={{border: "1px solid rgba(0, 0, 0, 1)", position: "absolute", width: "100%", height: "100%"}}>
              {this.props.children}
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          {/* TODO(yigitozkavci): Use human-readable hours here. */}
          {/* TODO(yigitozkavci): Use a spinning icon instead of "Loading..." text here. */}
          <TimestampRanges start={this.props.scopeStart !== null ? secondsToStringTimestamp(this.props.scopeStart) : "Loading..."} end={this.props.scopeEnd !== null ? secondsToStringTimestamp(this.props.scopeEnd) : "Loading..."} />
        </Grid>
      </Grid>
    )
  }
}


