import React, { Component } from 'react'
var register = require('../functions/register')

export default class RegForm extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            username_status: null,
            password_status: null,
            password: '',
            password2: ''

        }
        this.handleInputState = this.handleInputState.bind(this)        
        this.handleSignupForm = this.handleSignupForm.bind(this)
    }
    


    handleInputState(e){   
        this.setState({[e.target.name]:e.target.value})

        if([e.target.name] == "username"){
            return register.handleUsername(this, e.target.value)
        }
        else if([e.target.name] == "password2"){
            return register.handlePassword(this, e.target.value)
        }
    }
   
    
    handleSignupForm(e){
        e.preventDefault()
        var {username, username_status, password_status, password, password2 } = this.state
        if(username_status == null || password_status == null){
            register.handleUsername(this, username)
            register.handlePassword(this, password2)
        }
        else if (username_status === '' && password_status === ''){
            register.handleSignupForm(this)
        }
    }
  
    usernameStatus(){
        var { username_status} = this.state
            if(username_status != null) return username_status
    }
    passwordStatus(){
        var {password_status } = this.state
        if(password_status != null) return password_status
    
    }

  render() {
     const enabled = this.state.username_status === '' && this.state.password_status === '';
    return (
      <div>
    
    <p>{this.usernameStatus()}</p>
    <p>{this.passwordStatus()}</p>
      <form onSubmit={this.handleSignupForm}>
        Username:<input name="username" type="text" onChange={this.handleInputState} /><br/>
        Password:<input name="password" type="password"  onChange={this.handleInputState} /><br/>
        Confirm Password:<input name="password2" type="password" onChange={this.handleInputState}/><br/>
        <input name="submit" disabled={!enabled} type="submit" value="Register"/>
      </form>
        
      </div>
    )
  }


  
}
