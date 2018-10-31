import React, { Component } from 'react'

export default class ModeButton extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <div>
        <button onClick={this.props.changeMode}>{this.props.toMode}</button>
      </div>
    )
  }
}
