import {EventEmitter} from 'events'
import dispatcher from '../dispatcher'
var uf = require('../functions/user_functions')

class TodoStore extends EventEmitter {
    constructor(){
        super();
        this.todos = []
        this.currentTodo = {}

    }
    getTodo(id){
        uf.getTodo(id).then(
            (response) => {
                if(response.data.success){
                    this.emit('todo_update')
                    this.currentTodo = response.data.todo
                    return true;
                }
            }
        )
    }

    createTodo(content){
            uf.createTodo(content).then(
                (response) => {
                    if (response.data.success){
                        this.emit('create')
                        return true

                    }else{
                        return false
                    }
                }
            )
    }

    toggleTodo(id, status){
        uf.toggleTodo(id, status).then(
            response => {
                if(response.data.success){
                    this.emit('todo_update')
                    return true
                }else{
                    return false
                }
            }
        )
    }
    deleteTodo(id){
        uf.deleteTodo(id).then(
            response => {
                if(response.data.success){
                    this.emit('delete')
                    return true
                }else{
                    return false
                }
            }
        )
    }

  

    receiveTodos(){
        uf.receiveTodos().then(
            response => {
                if(response.data.success){
                    this.todos = response.data.todos
                    this.loading = false
                    this.emit('receive')
                    return true;
                }else{
                    return false
                }
            }
        )
    }

    getAll(){
        return this.todos
    }

    getCurrentTodo(){
        return this.currentTodo
    }

 
    handleActions(action){
        switch(action.type){
            case 'GET_TODO':{
                return this.getTodo(action.id)
            }
            case 'CREATE_TODO': {
                return this.createTodo(action.content)
            }
            case 'TOGGLE_TODO': {
                return this.toggleTodo(action.id, action.status)
            }
            case 'DELETE_TODO': {
                return this.deleteTodo(action.id)
            }
        
            case 'RECEIVE_TODOS': {
                return this.receiveTodos()
            }
        }
    }
}

const todoStore = new TodoStore()
/*
    * register a listener (todoStore) to dispatcher
    * dispatcher.register( arg ) , arg = store's method to handle actions
    * dispatcher.dispatch(action object)
 */
dispatcher.register(todoStore.handleActions.bind(todoStore))
export default todoStore;
