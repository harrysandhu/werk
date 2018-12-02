import dispatcher from '../dispatcher'


module.exports = {
    getTodo : (id) => {
        dispatcher.dispatch({
            type: 'GET_TODO',
            id
        })
    },
    createTodo : (content) => {
        dispatcher.dispatch({
            type: 'CREATE_TODO',
            content
        });
    },
    toggleTodo: (id, status) => {
        dispatcher.dispatch({
            type: 'TOGGLE_TODO',
            id,
            status
        })
    },
    deleteTodo: (id) => {
        dispatcher.dispatch({
            type: 'DELETE_TODO',
            id
        })
    },
    receiveTodos : () =>{
        dispatcher.dispatch({
            type: 'LOAD_TODOS'
        })
        dispatcher.dispatch({
            type: 'RECEIVE_TODOS'
        })
    }
}