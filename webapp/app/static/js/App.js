import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AddTodo from './components/AddTodo'
import User from './user'
import TodoList from './components/Todolist'
import {fetchTodos, toggleTodo, deleteTodo, updateTodo, addTodo} from './actions/todosActions'
import {fetchUser} from './actions/userActions'

import {Provider} from 'react-redux'
import {connect} from 'react-redux'
import store from './store'
/**
*DECORATOR @connect 
*@param function : gets store values and maps as component props
*******@param store : store to get data from.
*************@param function a : maps store values to props
*************@param function b: //
*@returns : 
 */


@connect((store) => {
    return {
        user: store.user.user,
        userLoadingStatus : store.user.loading,
        userError : store.user.error,

        todos : store.todos.todos,
        todosById: store.todos.todosById,
        todosError : store.todos.error,
        todosLoadingStatus: store.todos.loading

    }
})
class App extends Component {
    constructor(props){
        super(props);
        this.handleTodoInputSubmit = this.handleTodoInputSubmit.bind(this)
        this.todoshandleAction = this.todoshandleAction.bind(this)
    }
    componentDidMount(){
        this.props.dispatch(fetchUser())
        this.props.dispatch(fetchTodos())
    }
    handleTodoInputSubmit(todo){
        console.log('value to submit', todo)
        return this.props.dispatch(addTodo(todo, this.props.todos, this.props.todosById))

    }

    todoshandleAction(action) {
        switch(action.type){
            case 'TOGGLE_TODO':{
                
                console.log('app_action_log', action)
               return this.props.dispatch(toggleTodo(action.payload.id, 
                    action.payload.status, 
                    this.props.todos, 
                    this.props.todosById));
            }
             case 'UPDATE_TODO':{
                return this.props.dispatch(updateTodo(action.payload.id, 
                    action.payload.content, 
                    this.props.todos, 
                    this.props.todosById));
            }
             case 'DELETE_TODO':{
                return this.props.dispatch(deleteTodo(action.payload.id, 
                    this.props.todos, 
                    this.props.todosById));
            }
        }
    }




    render(){
        return(
        <div>
           
            <AddTodo handleForm={this.handleTodoInputSubmit} />
            <TodoList todos={this.props.todos} loading={this.props.todosLoadingStatus} todosById={this.props.todosById} todoshandleAction={this.todoshandleAction}/>
             <User user={this.props.user} userLoadingStatus={this.props.userLoadingStatus} />
        </div>
        )
        
    }
}

const root = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    root
)