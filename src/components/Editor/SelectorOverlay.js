import React from 'react'
import { MODE_ZOOM, MODE_CROP } from './Constants'
import { Selection, Cursor } from './Selection'

const SELECTION_STATE_NOT_SELECTING = 'SELECTION_STATE_NOT_SELECTING'
const SELECTION_STATE_SELECTING = 'SELECTION_STATE_SELECTING'
const SELECTION_STATE_FINISHED_SELECTING = 'SELECTION_STATE_FINISHED_SELECTING'

export default class SelectorOverlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = { mode: MODE_ZOOM, cursorX: 0, selectionStartX: 0, y: 0, selectionEndX: 0, selectionState: SELECTION_STATE_NOT_SELECTING }
  }

  _onMouseMove(e) {
    const ne = e.nativeEvent
    if(ne.offsetX > 3) {
      switch(this.state.selectionState) {
        case SELECTION_STATE_NOT_SELECTING:
          this.setState((state) => ({ ...state, cursorX: ne.offsetX}))
          break
        case SELECTION_STATE_SELECTING:
          this.setState((state) => ({ ...state, cursorX: ne.offsetX, selectionEndX: ne.offsetX > state.selectionStartX ? ne.offsetX : state.selectionEndX, y: 0 }))
          break
        case SELECTION_STATE_FINISHED_SELECTING:
          break
        default:
          console.error("Invalid selection state: " + this.state.selectionState)
          break
      }
    }
  }

  _onClick(e) {
    const ne = e.nativeEvent
    console.log(ne)
    switch(this.state.selectionState) {
      case SELECTION_STATE_NOT_SELECTING:
        console.log(this.state)
        this.setState((state) => ({ ...state, selectionStartX: state.cursorX, selectionState: SELECTION_STATE_SELECTING }))
        break
      case SELECTION_STATE_SELECTING:
        console.log(this.state)
        if(this.state.selectionEndX > this.state.selectionStartX) {
          const endPercentage = 100 * this.state.selectionEndX / this.props.segmentsBarRef.current.offsetWidth
          const startPercentage = 100 * this.state.selectionStartX / this.props.segmentsBarRef.current.offsetWidth
          switch(this.state.mode) {
            case MODE_CROP:
              this.props.onSelectRange({startPercentage, endPercentage})
              this.setState({...this.state, selectionStartX: 0, selectionEndX: 0, selectionState: SELECTION_STATE_NOT_SELECTING})
              break
            case MODE_ZOOM:
              this.props.onZoom({startPercentage, endPercentage})
              this.setState({...this.state, selectionStartX: 0, selectionEndX: 0, selectionState: SELECTION_STATE_NOT_SELECTING})
              break
            default:
              console.error("Unexpected mode: " + this.state.mode)
          }
        }
        break
      default:
        console.error("Invalid selection state: " + this.state.selectionState)
        break
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
      <div onClick={this._onClick.bind(this)} onMouseMove={this._onMouseMove.bind(this)} style={{position: "absolute", left: 0, top: 0, width: "100%", height: "100%", zIndex: 2}}>
        <Selection width={this.state.selectionEndX - this.state.selectionStartX} left={this.state.selectionStartX}/>
        <Cursor pos={this.state.cursorX}/>
      </div>
    )
  }
}


