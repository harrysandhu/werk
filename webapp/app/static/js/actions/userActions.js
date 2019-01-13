/**
@file userActions.js
Action objects for user.
 */
import axios from 'axios'

/**
*fetch user action
*@returns an action object 
 */

export function fetchUser(){
    return {
        type: 'FETCH_USER',
        payload : axios({
            method : 'GET', 
            url: '/api/session'             
        })
    }
}

