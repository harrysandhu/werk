import React, { Component } from 'react';
import Todo from './todo'
import TodoInput from './todoinput'
var uf = require('../functions/user_functions')

export default class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            //store todos
            todos : [],

        }
        this.handleForm = this.handleForm.bind(this)
    }
    
    //get todos when component mounts first time
    componentWillMount() {
        uf.getTodos(this)
    }
    
    //invoked from 'TodoInput', add todo to DB and GET todos
    handleForm(data){
        uf.addTodo(data, this)
        uf.getTodos(this)
    }

    

   
    render() {
        //get todos from state
        const {todos} = this.state
        //get the todo components, with each item as <Todo />
        const todoComponents = todos.map((todo) =>{return(<Todo key={todo.id} id={todo.id} content={todo.content} status={todo.status}/>)})
        return (<div>
         <TodoInput handleForm={this.handleForm} value=''/>
        {todoComponents}
        
        </div>);
    }
}
