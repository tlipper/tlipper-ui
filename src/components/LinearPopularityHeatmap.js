import React from 'react'
import ReactTooltip from "react-tooltip";

const Segment = ({percentage, baseIntensity, intensity, score, start, end}) => {
  const netIntensity = baseIntensity + intensity * (1 - baseIntensity)
  return (<div data-tip={start + ":" + end} score={score} style={{pointerEvents: "none", position: "relative", backgroundColor: "blue", zIndex: "1", float: "left", display: "inline-block", width: percentage + "%", height: "50px", backgroundColor: "rgba(255, 0, 0, " + netIntensity + ")"}}></div>)
}

const Cropper = ({left, width}) => (
  <div style={{position: "absolute", left: left, width: width + "px", backgroundColor: "green", display: "block", height: "100%"}}></div>
)
class Segments extends React.Component {
  constructor(props) {
    super(props)
    this.state = { x: 0, y: 0, baseX: 0, keepSelection: false }
    this.segmentsBarRef = React.createRef()
    this.segmentsBarWidth = null
  }

  _onDrag(e) {
    console.log("_onDrag")
    if(e.nativeEvent.offsetX > 0) {
      this.setState({ ...this.state, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
      console.log(this.state)
    }
  }

  _onMouseMove(e) {
    console.log("_onMouseMove")
    if(e && e.nativeEvent && e.nativeEvent.offsetX > 3) {
      if(!this.state.keepSelection) {
        this.setState({ ...this.state, baseX: e.nativeEvent.offsetX - 3, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
      }
    }
  }

  _onMouseEnter(e) {
    this.setState({...this.state})
  }

  _onClick(e) {
    this.setState({ ...this.state, x: 0, y: 0, baseX: 0, keepSelection: false })
  }

  _onMouseLeave(e) {
  }

  _onDragStart(e) {
    this.setState({...this.state, baseX: e.nativeEvent.offsetX})
  }

  _onDragEnd(e) {
    if(this.state.x > this.state.baseX) {
      const endPercentage = 100 * this.state.x / this.segmentsBarWidth
      const startPercentage = 100 * this.state.baseX / this.segmentsBarWidth
      this.props.onSelectRange({startPercentage, endPercentage})
      this.setState({...this.state, keepSelection: true})
    }
  }

  componentDidMount() {
    this.segmentsBarWidth = this.segmentsBarRef.current.offsetWidth
  }

  render() {
    return (
      <div ref={this.segmentsBarRef} draggable="true" onClick={this._onClick.bind(this)} onDrag={this._onDrag.bind(this)} onDragStart={this._onDragStart.bind(this)} onDragEnd={this._onDragEnd.bind(this)} onMouseLeave={this._onMouseLeave.bind(this)} onMouseEnter={this._onMouseEnter.bind(this)} onMouseMove={this._onMouseMove.bind(this)} style={{border: "3px solid rgba(255, 0, 0, 0.2)", position: "relative", zIndex: 2}}>
        <Cropper width={this.state.x - this.state.baseX} left={this.state.baseX}/>
        {this.props.children} 
      </div>
    )
  }
}

class LinearPopularityHeatmap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  setPlayer(player) {
    this.setState((state) => ({...state, player}))
  }

  render() {
    const maxPossibleScore = this.props.timeline ? (
      this.props.timeline.events.reduce((accum, ev) => ({
          incrementalScore: accum.incrementalScore + ev[1],
          maxIncrementalScore: Math.max(accum.maxIncrementalScore, accum.incrementalScore + ev[1])
       }), {incrementalScore: 0, maxIncrementalScore: 0}).maxIncrementalScore) : 0;
    return this.props.timeline ? (
      <Segments onSelectRange={(range) => {
        const { startPercentage, endPercentage } = range
        const startTimestamp = startPercentage * this.state.player.getDuration() / 100
        const endTimestamp = endPercentage * this.state.player.getDuration() / 100
        this.state.player.seek(startTimestamp)
        console.log("Pausing in " + (endTimestamp - startTimestamp) + " seconds")
        setTimeout(() => {
          this.state.player.pause()
        }, endTimestamp - startTimestamp)
      }}>
        {this.props.timeline.events.sort((e1, e2) => e1[0] - e2[0]).reduce((accum, ev, index) => {
          const gapSegmentPercentage = 100 * (ev[0] - accum.ev[0]) / this.props.timeline.duration
          const newScore = accum.score + ev[1]
          const gapSegment = <Segment key={index} start={accum.ev[0]} end={ev[0]} percentage={gapSegmentPercentage} baseIntensity={0} intensity={accum.score / maxPossibleScore} />

          return ({ev: ev,
            segments: accum.segments.concat([gapSegment]), score: newScore
          })
        }, {ev: [0, 0], score: 0, segments: []}).segments}
        <ReactTooltip />
      </Segments>
    ) : (<>Analysis data doesn't exist for this video.</>)
  }
}

export default LinearPopularityHeatmap
