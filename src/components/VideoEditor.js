import React from 'react'
import ReactTooltip from "react-tooltip";
import SegmentCropList from './Editor/SegmentCropList'
import SegmentsLine from './Editor/SegmentsLine'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Title from '../ui/Title';

const Segment = ({percentage, baseIntensity, intensity, score, start, end}) => {
  const netIntensity = baseIntensity + intensity * (1 - baseIntensity)
  return (<div data-tip={start + ":" + end} score={score} style={{pointerEvents: "none", position: "relative", float: "left", display: "inline-block", width: percentage + "%", height: "100%", backgroundColor: "rgba(255, 0, 0, " + netIntensity + ")"}}></div>)
}

class VideoEditor extends React.Component {
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
      if(player.getDuration() === 0) return;
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
    const startTimestamp = this.state.scope.start + startPercentage * currentDuration / 100
    const endTimestamp = this.state.scope.start + endPercentage * currentDuration / 100
    this.state.player.seek(startTimestamp)
    this.state.player.play()
    console.log("Pausing in " + (endTimestamp - startTimestamp) + " seconds")
    // TODO(yigitozkavci): We should reset this interval if a new range is selected as well.
    setTimeout(() => {
      this.state.player.pause()
    }, (endTimestamp - startTimestamp) * 1000)
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
        <Grid item xs={12}>
          <Paper className={this.props.fixedHeightPaper}>
            <Title>Popular Segments</Title>
            <SegmentsLine resetZoom={this.resetZoom.bind(this)} onZoom={this.onZoom.bind(this)} scopeStart={this.state.scope.start} scopeEnd={this.state.scope.end} onSelectRange={this.onSelectRange.bind(this)}>
              { this.generateSegments(this.props.timeline) }
              <ReactTooltip />
            </SegmentsLine>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={this.props.fixedHeightPaper}>
            <Title>Cropped Segments</Title>
            <SegmentCropList fixedHeightPaper={this.props.fixedHeightPaper} ref={this.segmentCropList} classes={this.props.classes}/>
          </Paper>
        </Grid>
      </>
    ) : (<>Analysis data doesn't exist for this video.</>)
  }
}

export default VideoEditor
