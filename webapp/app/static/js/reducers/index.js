/**
@file index.js
Combine the reducers
 */

import {combineReducers} from 'redux'
import todosReducer from './todosReducer'
import userReducer from './userReducer'


/** 
    COMBINED STATE

    user : 
    {
        user : 
        {
            id : 0,
            username : ''
        },
        loading: false,
        error : null
    },

    todos : 
    {
        todos : 
        [
            {
                id: 0,
                content : '',
                status : false,
            }
        ],
        loading: false,
        error : null
    }


 */



//combines the reducer
/**
*@param object combining state objects and their corresponding reducers
*@returns a combined reducer
 */
export default combineReducers({
    user : userReducer,
    todos : todosReducer
})