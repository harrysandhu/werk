import {EventEmiiter} from 'events'

class TodoStore extends EventEmiiter {
    construtor(){
        super();
        this.todos = [
            {
                'id' : 104,
                'content' : 'sfagfas',
                'status': false
            }
        ]

        getAll(){
            return this.todos
        }
    }
}


const todoStore = new TodoStore;
export default todoStore;