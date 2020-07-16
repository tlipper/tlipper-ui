import React from 'react'
import ReactTooltip from "react-tooltip";

const Segment = ({percentage, tooltip, baseIntensity, intensity, score, start, end}) => {
  const netIntensity = baseIntensity + intensity * (1 - baseIntensity)
  return (<div data-tip={start + ":" + end} score={score} style={{float: "left", width: percentage + "%", height: "50px", backgroundColor: "rgba(255, 0, 0, " + netIntensity + ")"}}></div>)
}

const LinearPopularityHeatmap = ({timeline}) => {
  const maxPossibleScore = timeline ? (
    timeline.events.reduce((accum, ev) => ({
        incrementalScore: accum.incrementalScore + ev[1],
        maxIncrementalScore: Math.max(accum.maxIncrementalScore, accum.incrementalScore + ev[1])
     }), {incrementalScore: 0, maxIncrementalScore: 0}).maxIncrementalScore) : 0;
  return timeline ? (
    <div style={{border: "3px solid rgba(255, 0, 0, 0.2)"}}>
      {timeline.events.sort((e1, e2) => e1[0] - e2[0]).reduce((accum, ev, index) => {
        const gapSegmentPercentage = 100 * (ev[0] - accum.ev[0]) / timeline.duration
        const newScore = accum.score + ev[1]
        const gapSegment = <Segment tooltip="wow" key={index} start={accum.ev[0]} end={ev[0]} percentage={gapSegmentPercentage} baseIntensity={0} intensity={accum.score / maxPossibleScore} />
        const tooltip = <p data-tip="hello world">Tooltip</p>

        return ({ev: ev,
          segments: accum.segments.concat([gapSegment]), score: newScore
        })
      }, {ev: [0, 0], score: 0, segments: []}).segments}
      <ReactTooltip />
    </div>
  ) : (<>Analysis data doesn't exist for this video.</>)
}

export default LinearPopularityHeatmap
