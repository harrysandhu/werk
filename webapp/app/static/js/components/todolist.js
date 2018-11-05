import React, { Component } from 'react';
import Todo from './todo'
import TodoInput from './todoinput'
import TodoActions from '../actions/TodoActions'
import TodoStore from '../stores/TodoStore'
var uf = require('../functions/user_functions')

export default class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            //store todos
            todos : TodoStore.getAll(),
            loading : true
        }
        this.handleForm = this.handleForm.bind(this)
    }
    
    //get todos when component mounts first time
    componentWillMount() {
        /*  
            LISTENING TO TodoStore.
            subscribed to TodoStore,
            whenever TodoStore will "emit" an event => 'change',
            component will listen.
        */
        TodoStore.on('received', () =>{
            this.setState({loading:false})
        })

        TodoStore.on('change' , () => {
            if(this.state.loading == true){
                //todos not loaded yet
            this.setState({
                todos: []
                })
            }else{
            this.setState({
                todos : TodoStore.getAll()
            })
            }
           
        })
      //  uf.getTodos(this)
    }
    
    //invoked from 'TodoInput', add todo to DB and GET todos
    handleForm(content){
        TodoActions.createTodo(content)
        TodoActions.getTodos(content)
       // uf.addTodo(data, this)
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
