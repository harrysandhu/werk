import dispatcher from '../dispatcher'


module.exports = {
    receiveLastCreatedTodo : () => {
        dispatcher.dispatch({
            type: 'RECEIVE_LAST_CREATED_TODO'
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
    editTodo: (id, content) => {
        dispatcher.dispatch({
            type: 'EDIT_TODO',
            id,
            content
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