import React, { Component } from 'react'
import axios from 'axios';

var auth = require('../functions/auth')

export default class LoginForm extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            error : '',
            username : '',
            password : ''
        }
        this.handleSignupForm = this.handleSignupForm.bind(this)        
        this.handleUsernameInput = this.handleUsernameInput.bind(this)
        this.handlePasswordInput = this.handlePasswordInput.bind(this)
    }
    handleUsernameInput(e){
        this.setState({username: e.target.value})
    }
    handlePasswordInput(e){
        this.setState({password: e.target.value})
    }
    handleSignupForm(e){
        e.preventDefault()
        return auth.loginFormProcess(this)
    }
  render() {
     
    return (
      <div>
    <p>{this.state.error}</p>
      <form onSubmit={this.handleSignupForm}>
        Username:<input name="username" onChange={this.handleUsernameInput} type="text" /><br/>
        Password:<input name="password" onChange={this.handlePasswordInput}  type="password"/><br/>
        <input name="submit" type="submit" value="Login"/>
      </form>
        
      </div>
    )
  }
}
