import {EventEmitter} from 'events'
import dispatcher from '../dispatcher'
var uf = require('../functions/user_functions')

class TodoStore extends EventEmitter {
    constructor(){
        super();
        this.todos = uf.getTodos()
    }
        createTodo(content){
            if(uf.addTodo(content))
                this.emit('change')
        }

        toggleTodo(id, status){
            if(uf.toggleTodo(id, status))
                this.emit('toggle')
        }
        receiveTodos(){
            if(uf.getTodos()){
                this.emit('change')
            }
        }

        getAll(){
            return this.todos
        }

        handleActions(action){
            switch(action.type){
                case 'CREATE_TODO':{
                    this.createTodo(action.content)
                }
                case 'TOGGLE_TODO':{
                    this.toggleTodo(action.id, action.status)
                }
                case 'RECEIVE_TODOS':{
                    this.receiveTodos()
                }
            
            }
        }   
    }



const todoStore = new TodoStore;
//register a new listener 'TodoStore' to dispatcher
// takes a method as an argument, that handles actions

/*dispatcher.dispatch(ACTION OBJECT) dispatches 
the action object to registered stores
 (further handled by some method)
 *then we only respond to the actions we care about
*/ 
dispatcher.register(todoStore.handleActions.bind(todoStore))
window.dispatcher = dispatcher
window.todoStore = todoStore;
export default todoStore;