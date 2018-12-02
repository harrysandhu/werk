import React, { Component } from 'react';
import Todo from './todo'
import TodoInput from './todoinput'
import TodoStore from '../stores/TodoStore'
import TodoActions from '../actions/TodoActions'
var uf = require('../functions/user_functions')

export default class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            //store todos
            todos : [],
            loading : true
        }

        this.handleForm = this.handleForm.bind(this)
    }
    
    //get todos when component mounts first time
    componentWillMount() {
        console.log('reload')
        TodoActions.receiveTodos()
        TodoStore.on('receive', ()=> {
            this.setState({loading: false, todos: TodoStore.getAll()})
        })
        TodoStore.on('create', () => {
            // TODO: get the created todo and add to state list
            TodoActions.receiveTodos()
        })
        TodoStore.on('delete', ()=>{
            // TODO: get the id of the deleted todo and delete from state list
            TodoActions.receiveTodos()
        })
    }
    
    //invoked from 'TodoInput', add todo to DB
    handleForm(content){
        TodoActions.createTodo(content)
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
