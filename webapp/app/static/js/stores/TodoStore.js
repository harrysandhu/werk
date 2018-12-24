import {EventEmitter} from 'events'
import dispatcher from '../dispatcher'
var uf = require('../functions/user_functions')

class TodoStore extends EventEmitter {
    constructor(){
        super();
        this.todos = []
        this.lastCreatedTodo = {}

    }



    createTodo(content){
            uf.createTodo(content).then(
                (response) => {
                    if (response.data.success){
                        this.lastCreatedTodo.id = response.data.id;
                        this.lastCreatedTodo.content = response.data.content;
                        this.lastCreatedTodo.status = response.data.status;
                        this.emit('create')

                        return true

                    }else{
                        return false
                    }
                }
            )
    }

    receiveLastCreatedTodo(){
        return this.lastCreatedTodo
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


 
    handleActions(action){
        switch(action.type){
            case 'CREATE_TODO': {
                return this.createTodo(action.content)
            }
            case 'TOGGLE_TODO': {
                return this.toggleTodo(action.id, action.status)
            }
            case 'DELETE_TODO': {
                return this.deleteTodo(action.id)
            }
            case 'EDIT_TODO': {
                return this.editTodo(action.id, action.content)
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
