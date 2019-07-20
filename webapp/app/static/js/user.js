import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TodoList from './components/TodoList'
import Logout from './components/logout'
import {Provider} from 'react-redux'
import {connect} from 'react-redux'
import store from './store'
import {fetchUser} from './actions/userActions'

var uf = require('./functions/user_functions')
var auth = require('./functions/auth')

export default class User extends Component {
  constructor(props){
    super(props);
     this.logout = this.logout.bind(this)
}

    logout(){
        auth.logout()
    }

    

  render(){
     const {user, userLoadingStatus} = this.props
    if(userLoadingStatus == false){
      return (
          <div>
          <h4>{user.username}</h4>


        <Logout handleClick={this.logout} />
          </div>
      );    
    }else{
        return (
            <div>loading
                </div>
            )
    }
  }
}

