import dispatcher from '../dispatcher'


module.exports = {
    createTodo : (content) => {
        dispatcher.dispatch({
            type:'CREATE_TODO',
            content
        })
    },
    toggleTodo : (id, status) => {
        dispatcher.dispatch({
            type:'TOGGLE_TODO',
            id,
            status
        })
    },
    getTodos : () => {
        dispatcher.dispatch({
            type:'GET_TODOS'
        })
    }
}