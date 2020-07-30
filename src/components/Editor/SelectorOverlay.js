import React from 'react'
import { MODE_ZOOM, MODE_CROP } from './Constants'
import { Selection } from './Selection'

export default class SelectorOverlay extends React.Component {
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
        default:
          console.error("Unexpected mode: " + this.state.mode)
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
      default:
        console.error("Unexpected mode: " + this.state.mode)
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


