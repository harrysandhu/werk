/**
@file userActions.js
Action objects for user.
 */
import axios from 'axios'


/**
*FETCH_TODOS
*FETCH_TODO
*ADD_TODO
*DELETE_TODO
*TOGGLE_TODO
*UPDATE_TODO
*@returns an action object
 */


export function fetchTodos(){
    return {
        type: 'FETCH_TODOS',
        payload : axios({
            method: 'GET',
            url: 'api/todos'
        })
    }
}

export function fetchTodo(id){
    return {
        type: 'FETCH_TODO',
        payload : axios({
            method: 'GET',
            url: 'api/todo',
            params :{
                id
            }
        })
    }
}
export function addTodo(todo, todos, todosById){
    console.log('addTodo log', todo);
    
    return {
        type: 'ADD_TODO',
        meta: {todos: todos, todosById: todosById},
        payload : axios({
            method: 'POST',
            url: 'api/todo',
            data : {
                todo,
            }
        })
    }
}
export function deleteTodo(id, todos, todosById){
    return {
        type: 'DELETE_TODO',
        meta : {todos: todos, todosById: todosById},
        payload : axios({
            method: 'POST',
            url: 'api/todo/delete',
            data : {
                id
            }
        })
    }
}

export function toggleTodo(id, status, todos, todosById){

    return {
        type: 'TOGGLE_TODO',
        meta : {todos: todos, todosById: todosById},
        payload : axios({
            method : 'POST',
            url: 'api/todo/status',
            data : {
                id, 
                status
            }
        }),
        
    }
}
export function updateTodo(id, content, todos, todosById){
    console.log(id)
    return {
        type: 'UPDATE_TODO',

        payload : axios({
            method : 'POST',
            url : 'api/todo/update',
            data : {
                id, 
                content
            }
        })
    }
}

