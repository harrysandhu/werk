import React, { Component } from 'react'
import TodoStore from '../stores/TodoStore'
import TodoActions from '../actions/TodoActions'
import EditTodo from './EditTodo'
var uf = require('../functions/user_functions')


export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            content : this.props.content,
            status : this.props.status,
            mode: 'view'
        }
        this.toggleTodo = this.toggleTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.editTodo = this.editTodo.bind(this)
        this.save = this.save.bind(this)
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

    editTodo(){
        this.setState({'mode':'edit'})
    }

    save(value){
        this.setState({'content': value,'mode':'view'})
    }
    


  render() {
      var {status, content, mode} = this.state

    if(mode == 'view'){
        return (<div>
        <input type="checkbox" checked={status} onChange={this.toggleTodo} />
        {content}
        <button onClick={this.editTodo}>Edit</button>
        <button onClick={this.deleteTodo}>x</button>
        
        </div>)
    }
    else if(mode == 'edit'){
        return (
            <div>
            <EditTodo todo={content} save={this.save}/>
            </div>
        )
    }
  }
}
