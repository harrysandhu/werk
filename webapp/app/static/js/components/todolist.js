import React, { Component } from 'react';
import Todo from './todo'



var uf = require('../functions/user_functions')



export default class TodoList extends Component {
    constructor(props){
        super(props); 
        this.handleDispatch = this.handleDispatch.bind(this)
    }
    handleDispatch(action) {
         console.log('todolist_action_log', action)
        switch(action.type){
           
            case 'TOGGLE_TODO':{
                
                return this.props.todoshandleAction(action)
                break;

            }
            case 'DELETE_TODO':{
                return this.props.todoshandleAction(action)
                break;

            }
            case 'UPDATE_TODO':{
                return this.props.todoshandleAction(action)
                break;
            }
        }
    }
   
    render(){
        const {todos, todosById, loading} = this.props
        if(loading == true){
            return (
                <div>loading.......</div>
            )
        }else{
        var todo = {}
        var todosArray = []
        //todos is a hashtable
        
            todosById.map((id) => {
                todosArray.push(todos[id])
            })
            //array of 

          var mappedTodos =  todosArray.map((todo) =>{ 
               return (<Todo key={todo.id} todo={todo} handleDispatch={this.handleDispatch} />)
            })


            return (
               <div> x
               {mappedTodos}
               </div>
            )
        
        }
    }
    
}
