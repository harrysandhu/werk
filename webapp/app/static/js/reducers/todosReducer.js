/**
    @file todoReducer.js
    Reducer for handling Todos object
 */

//initial state object
const initialState = {
    todos : {}, 
    todosById : [],
    error: null,
    loading : false
    }


/**
reducer function for todos object
*@param state : initial state object
*@param action : dispatched action object of any type
*@returns A new (not mutated) state object 
 */
export default function todosReducer (state=initialState, action) {
    switch(action.type){
        case 'FETCH_TODOS_PENDING' : {
            
            state = {...state, loading: true}

            break;
        }
        case 'FETCH_TODOS_FULFILLED' : {
            var todos = {...action.payload.data.todos}
            var todosById = [...action.payload.data.todosById]
            //set the loading state of a todo to false
            todosById.map((id) => {
                todos[id.toString()]['loading'] = false
            })
            console.log(todos)
            console.log('fetching fulfilled log:', todos)
            state = {...state, todos: todos,  todosById : todosById, loading :false}
            break;
        }
        case 'FETCH_TODOS_REJECTED' :{
            state = {...state, error: action.payload}
            break;
        }
          
        case 'ADD_TODO_PENDING' : {
            /**
                action meta : todos, id
             */
            state = {...state}
            break;
        }
        case 'ADD_TODO_FULFILLED' : {
            //promise
            /**@returns todo
            *adds to todos and updates the  state
             */

            var todos = {...action.meta.todos}
            var todosById = [...action.meta.todosById]

            const todo = {...action.payload.data.todo}
            
            todosById.push(todo.id)
            todos[todo.id] = todo
            console.log(todos, todo, todosById)
             
            state = {...state, todos: todos, todosById: todosById }
            break;

        }
        
        case 'ADD_TODO_REJECTED':{
            state = {...state, error:action.payload}
            break;
        }
        //TOGGLE_TODO
        
        case 'TOGGLE_TODO_PENDING' : {
            break;
        }
        case 'TOGGLE_TODO_FULFILLED' : {

            //process payload
            const todoUpdate = {...action.payload.data.todo}
            const {id, status} = todoUpdate

            //meta 
            var todos = {...action.meta.todos}
            const todosById = [...action.meta.todosById]
            
            for(var index = 0, len = todosById.length; index < len; index++){
                if(todosById[index] == id){
                        todos[id]['status'] = status
                        break;
                }
            }
            state = {...state, todos: todos, todosById: todosById}
            break;
        }
        case 'TOGGLE_TODO_REJECTED' :{
            state = {...state, error: action.payload}
            break;
        }
        case 'DELETE_TODO_PENDING':{
            break;
        }
        case 'DELETE_TODO_FULFILLED': {
            var todos = {...action.meta.todos}
            var todosById = [...action.meta.todosById]
            var id = action.payload.data.id
            delete todos[id];
            for(var index = 0, len = todosById.length; index < len; index++){
                if(todosById[index] == id){
                    todosById.splice(index, 1)
                    break;
                }
            }
            state = {...state, todos: todos, todosById: todosById}

        }
        case 'DELETE_TODO_REJECTED':{
            break;
        }
        case 'UPDATE_TODO_PENDING' : {

            break;
        }
        case 'UPDATE_TODO_FULFILLED':{
            
            var todos = {...state.todos}
            const todo = {...action.payload.data.todo}
            console.log(todo)
            todos[todo.id]['loading'] = false
            todos[todo.id] = todo

            state = {...state, todos : todos}

        }


   default: {
  return {
    ...state
  }
}


    }

    return state;
}



