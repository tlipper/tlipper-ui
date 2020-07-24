import React from 'react'
import ReactTooltip from "react-tooltip";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const MODE_ZOOM = "zoom"
const MODE_CROP = "crop"
const Segment = ({percentage, baseIntensity, intensity, score, start, end}) => {
  const netIntensity = baseIntensity + intensity * (1 - baseIntensity)
  return (<div data-tip={start + ":" + end} score={score} style={{pointerEvents: "none", position: "relative", backgroundColor: "blue", float: "left", display: "inline-block", width: percentage + "%", height: "100%", backgroundColor: "rgba(255, 0, 0, " + netIntensity + ")"}}></div>)
}

class SelectorOverlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = { mode: MODE_ZOOM, x: 0, y: 0, baseX: 0, keepSelection: false }
  }

  _onDrag(e) {
    if(e.nativeEvent.offsetX > 0) {
      const ne = e.nativeEvent
      this.setState((state) => ({ ...state, x: ne.offsetX, y: 0 }))
    }
  }

  _onMouseMove(e) {
    console.log("Mode: " + this.state.mode)
    const ne = e.nativeEvent
    if(!this.state.keepSelection && ne.offsetX > 3) {
      this.setState((state) => ({ ...state, baseX: ne.offsetX, x: ne.offsetX + 3, y: 0 }))
    }
  }

  _onClick(e) {
    this.setState((state) => ({ ...state, x: 0, y: 0, baseX: 0, keepSelection: false }))
  }

  _onMouseLeave(e) {
  }

  _onDragStart(e) {
    const ne = e.nativeEvent
    this.setState((state) => ({...state, baseX: ne.offsetX}))
  }

  _onDragEnd(e) {
    if(this.state.x > this.state.baseX) {
      const endPercentage = 100 * this.state.x / this.props.segmentsBarRef.current.offsetWidth
      const startPercentage = 100 * this.state.baseX / this.props.segmentsBarRef.current.offsetWidth
      switch(this.state.mode) {
        case MODE_CROP:
          this.props.onSelectRange({startPercentage, endPercentage})
          this.setState({...this.state, keepSelection: true})
          break
        case MODE_ZOOM:
          this.props.onZoom({startPercentage, endPercentage})
          this.setState({...this.state, keepSelection: false})
          break
      }
    }
  }

  clearSelection() {
    this.setState((state) => ({...state, x: 0, y: 0, baseX: 0, keepSelection: false}))
  }

  changeMode() {
    console.log("Changing mode")
    switch(this.state.mode) {
      case MODE_ZOOM:
        this.setState((state) => ({ ...state, mode: MODE_CROP}))
        return MODE_CROP
      case MODE_CROP:
        this.setState((state) => ({ ...state, mode: MODE_ZOOM }))
        return MODE_ZOOM
    }
  }

  render() {
    return (
      <div draggable="true" onClick={this._onClick.bind(this)} onDrag={this._onDrag.bind(this)} onDragStart={this._onDragStart.bind(this)} onDragEnd={this._onDragEnd.bind(this)} onMouseLeave={this._onMouseLeave.bind(this)} onMouseMove={this._onMouseMove.bind(this)} style={{position: "absolute", left: 0, top: 0, width: "100%", height: "100%", zIndex: 2}}>
        <Selection width={this.state.x - this.state.baseX} left={this.state.baseX}/>
      </div>
    )
  }
}

class Selection extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div style={{position: "absolute", left: this.props.left, width: this.props.width + "px", backgroundColor: "rgba(0, 255, 0, 0.4)", display: "block", height: "100%"}}></div>)
  }
}

const TimestampRanges = ({start, end}) => (
  <div style={{position: "relative"}}>
    <div style={{float: "left"}}>{start}</div>
    <div style={{float: "right"}}>{end}</div>
  </div>
)

class Segments extends React.Component {
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
          <TimestampRanges start={this.props.scopeStart !== null ? this.props.scopeStart : "Loading..."} end={this.props.scopeEnd !== null ? this.props.scopeEnd : "Loading..."} />
        </Grid>
      </Grid>
    )
  }
}

class SegmentCropList extends React.Component {
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
    console.log(this.state)
    return (
      <>{this.state.segmentCrops.map((segmentCrop, i) => (
        <span key={i}>{segmentCrop.startTimestamp}</span>
      ))}</>
    )
  }
}

class LinearPopularityHeatmap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scope: {
        start: null,
        end: null
      }
    }
    this.segmentCropList = React.createRef()
  }

  componentDidMount() {
    this.props.onLoad()
  }

  onZoom(range) {
    const currentDuration = this.state.scope.end - this.state.scope.start
    this.setState((state) => ({...state, scope: {
      start: state.scope.start + currentDuration * range.startPercentage / 100, 
      end: state.scope.start + currentDuration * range.endPercentage / 100, 
    }}))
    console.log("Zoomed: " + range)
  }

  setPlayer(player) {
    var interval = setInterval(() => {
      if(player.getDuration() == 0) return;
      console.log(player._player._playerState.duration)
      this.setState((state) => ({...state, player, scope: {
        start: 0,
        end: player.getDuration()
      }}))
      clearInterval(interval)
    }, 100)
  }

  addSegmentCrop(startTimestamp, endTimestamp) {
    this.segmentCropList.current.add(startTimestamp, endTimestamp)
  }

  onSelectRange(range) {
    const { startPercentage, endPercentage } = range
    const currentDuration = this.state.scope.end - this.state.scope.start
    const startTimestamp = startPercentage * currentDuration / 100
    const endTimestamp = endPercentage * currentDuration / 100
    this.state.player.seek(startTimestamp)
    console.log("Pausing in " + (endTimestamp - startTimestamp) + " seconds")
    setTimeout(() => {
      this.state.player.pause()
    }, endTimestamp - startTimestamp)
    this.addSegmentCrop(startTimestamp, endTimestamp)
  }

  resetZoom() {
    this.setState((state) => ({...state, scope: {
      start: 0,
      end: this.state.player.getDuration() // What if player is not set yet?
    }}))
  }

  generateSegments(timeline) {
    if(this.state.scope.start === null || this.state.scope.end === null) return (<>Loading...</>)
    const maxPossibleScore = timeline.events.reduce((accum, ev) => ({
          incrementalScore: accum.incrementalScore + ev[1],
          maxIncrementalScore: Math.max(accum.maxIncrementalScore, accum.incrementalScore + ev[1])
       }), {incrementalScore: 0, maxIncrementalScore: 0}).maxIncrementalScore
    const currentTimelineDuration = this.state.scope.end - this.state.scope.start
    return (
      <>{timeline.events.sort((e1, e2) => e1[0] - e2[0]).filter(e => this.state.scope.start <= e[0] && e[0] <= this.state.scope.end).map(e => [e[0] - this.state.scope.start, e[1]]).reduce((accum, ev, index) => {
      const gapSegmentPercentage = 100 * (ev[0] - accum.ev[0]) / currentTimelineDuration
      const newScore = accum.score + ev[1]
      const gapSegment = <Segment key={index} start={accum.ev[0]} end={ev[0]} percentage={gapSegmentPercentage} baseIntensity={0} intensity={accum.score / maxPossibleScore} />

      return ({ev: ev,
        segments: accum.segments.concat([gapSegment]), score: newScore
      })
    }, {ev: [0, 0], score: 0, segments: []}).segments}</>)
  }

  render() {
    return this.props.timeline ? (
      <>
        <Segments resetZoom={this.resetZoom.bind(this)} onZoom={this.onZoom.bind(this)} scopeStart={this.state.scope.start} scopeEnd={this.state.scope.end} onSelectRange={this.onSelectRange.bind(this)}>
          { this.generateSegments(this.props.timeline) }
          <ReactTooltip />
        </Segments>
        <SegmentCropList ref={this.segmentCropList}/>
      </>
    ) : (<>Analysis data doesn't exist for this video.</>)
  }
}

export default LinearPopularityHeatmap
