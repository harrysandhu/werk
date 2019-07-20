/**
@file userReducer.js
*Reducer for handling user object
 */

//Initial state object
const initialState = {
    user: {
        id: 0,
        username : ''
    },
    loading: false,
    error : null
};

/**reducer for user object 
*@param state : initial state object
*@param action : dispatched action object of any type
*@returns A new (not mutated) state object 
*/

export default function userReducer(state=initialState, action){
    switch(action.type){
        case 'FETCH_USER_PENDING': {
            state = {...state, loading :true}
            break;
        }
        case 'FETCH_USER_FULFILLED': {
            console.log(action.payload.data.user)
            state = {...state, user : action.payload.data.user, loading: false}
             
            break;
        }
        case 'FETCH_USER_REJECTED': {
            state = {...state, error: action.payload.error}
            break;
        }
    
    }
    return state;
}

