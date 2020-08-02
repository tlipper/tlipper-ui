import React from 'react'

export class Selection extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div style={{position: "absolute", pointerEvents: "none", zIndex: "-1", left: this.props.left, width: this.props.width + "px", backgroundColor: "rgba(0, 255, 0, 0.4)", display: "block", height: "100%"}}></div>)
  }
}

export class Cursor extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div style={{position: "absolute", pointerEvents: "none", zIndex: "-1", left: this.props.pos, width: "3px", backgroundColor: "rgba(0, 255, 0, 0.4)", display: "block", height: "100%"}}></div>)
  }
}
    
