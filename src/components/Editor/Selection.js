import React from 'react'

export const Selection = ({left, width}) => (
    <div style={{position: "absolute", pointerEvents: "none", zIndex: "-1", left: left, width: width + "px", backgroundColor: "rgba(0, 255, 0, 0.4)", display: "block", height: "100%"}}></div>)

export const Cursor = ({pos}) => (
    <div style={{position: "absolute", pointerEvents: "none", zIndex: "-1", left: pos, width: "3px", backgroundColor: "rgba(0, 255, 0, 0.4)", display: "block", height: "100%"}}></div>)
    
