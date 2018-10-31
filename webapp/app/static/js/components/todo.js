import React, { Component } from 'react'

var uf = require('../functions/user_functions')
export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            content : this.props.content,
            status : this.props.status
        }
        this.toggleTodoStatus = this.toggleTodoStatus.bind(this)

    }
    
    //this.setState({viewId:this.props.viewId, content:this.props.content, status:this.props.status})

    
    toggleTodoStatus(){
        return uf.toggleTodoStatus(this)
    }

  render() {
      var status = this.state.status

    return (
      <div>
      <p>
        <input type="checkbox" checked={status} onChange={this.toggleTodoStatus} />
        {this.state.content}</p>
      </div>
    )
  }
}
