import React, { Component } from 'react'
import EditTodo from './EditTodo'
var uf = require('../functions/user_functions')



export default class Todo extends Component {
  constructor(props) {
        super(props);
        this.state = {
          editMode : false,
          loading: false
        }
        this.toggleTodo =this.toggleTodo.bind(this)

        this.deleteTodo = this.deleteTodo.bind(this)
        this.updateTodo = this.updateTodo.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.enableEdit = this.enableEdit.bind(this)
  }

  toggleTodo(){
    this.props.handleDispatch(
  {
    type:'TOGGLE_TODO',
      payload: {
        id: this.props.todo.id,
        status : this.props.todo.status
      }
    })
}
  updateTodo(value){
    this.props.handleDispatch({
      type:'UPDATE_TODO',
      payload: {
        id: this.props.todo.id,
        content: value
      }
    })
   this.setState({editMode:false, loading:true})
  }
  deleteTodo(){
 this.props.handleDispatch({
      type:'DELETE_TODO',
      payload: {
        id: this.props.todo.id
      }
    })
  }
  enableEdit(){
    this.setState({editMode:true})
  }
  handleCancel(){
    this.setState({
      editMode: false
    })
  }

  render() {
    const {id, content, loading, status} = this.props.todo
    const {editMode  } = this.state
    if(loading == true){
    
        return (
            <p>Loading.....</p>
        )
    }
      else if(editMode == false){
      return (
        
        <div>
          
          <input type="checkbox" onChange={this.toggleTodo} checked={status}  />
            {content}
        
          <button onClick={this.deleteTodo} >x</button>
          <button onClick={this.enableEdit}> Edit </button>
        </div>
      )
    }
      else if(editMode == true){
        return (
          <EditTodo content={content}  onCancel={this.handleCancel} handleUpdate={this.updateTodo}/>
        )
      }
    }
  
}
