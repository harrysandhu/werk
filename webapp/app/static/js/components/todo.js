import React, { Component } from 'react'
import TodoStore from '../stores/TodoStore'
import TodoActions from '../actions/TodoActions'


var uf = require('../functions/user_functions')
export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            content : this.props.content,
            status : this.props.status
        }
        this.toggleTodo = this.toggleTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
    }
    
    //this.setState({viewId:this.props.viewId, content:this.props.content, status:this.props.status})

  
    toggleTodo(){
        //TodoAction
        const status = this.state.status
        this.setState({'status': !status})
        TodoActions.toggleTodo(this.state.id, this.state.status)
    }

    deleteTodo(){
        //TodoAction
        TodoActions.deleteTodo(this.state.id)
    }

  render() {
      var status = this.state.status

    return (
      <div>
      <p>
        <input type="checkbox" checked={status} onChange={this.toggleTodo} />
        {this.state.content}
        <button onClick={this.deleteTodo}>x</button>
        </p>
      </div>
    )
  }
}
