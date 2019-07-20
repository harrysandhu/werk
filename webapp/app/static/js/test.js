import {applyMiddleware, combineReducers, createStore } from 'redux';
import {createLogger} from 'redux-logger'
import axios from 'axios'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'


const initialUserState = {name: '', age: 0}
const userReducer = (state=initialUserState, action) => {
    switch(action.type){
        case 'CHANGE_NAME' : {
            state = {...state, name: action.payload}
        break;
        }
        case 'CHANGE_AGE': {
            state = {...state, age: action.payload}
            break;
        }

       
    }
    return state;
}


const initialTweetsState = []
const tweetsReducer = (state=initialTweetsState, action) => { 
   switch(action.type){
        case 'ADD_TWEET': {
            state = state.concat(action.payload)
        break;
    }
        case 'FETCH_TODOS_FULFILLED': {
            state = state.concat(action.payload.data.todos)
        break;
        }
      
   }
    return state;
}

const loadingState = {loading : false, error: null}
const loadReducer = (state=loadingState, action) => {
    switch(action.type){
        case 'FETCH_TODOS_PENDING': {
            state = {...state, loading: true}
            break;
        }
        case 'FETCH_TODOS_FULFILLED': {
            state = {...state, loading: false}
            break;
        }
        case 'FETCH_TODOS_REJECTED':{
            state = {...state, error: action.payload}
        break;
        }
    }
    return state;
}

const reducers = combineReducers({
    user: userReducer,
    tweets : tweetsReducer,
    loading : loadReducer
})


const store = createStore(reducers, applyMiddleware(promise(), thunk, createLogger()))


store.subscribe(() => { 
    console.log("Store changed", store.getState())
})




store.dispatch({type: 'CHANGE_NAME', payload: 'Harry'})
store.dispatch({type: 'CHANGE_AGE', payload: 19})

store.dispatch({
    type: 'FETCH_TODOS',
    payload : axios({method: 'GET', 'url' : 'api/todo'})
    })



