import {EventEmitter} from 'events'

var uf = require('../functions/user_functions')

class TodoStore extends EventEmitter {
    constructor(){
        super();
        this.todos = []
        loading = false
    }

    getAll(){
        return this.todos
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
