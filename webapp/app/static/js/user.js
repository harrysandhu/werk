import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TodoList from './components/todolist'
import Logout from './components/logout'

var uf = require('./functions/user_functions')
var auth = require('./functions/auth')
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        user : {
            id: 0,
            username: ''
        }     
    }

     this.logout = this.logout.bind(this)
}

    componentWillMount() { 
      return uf.getUserData(this)
    }
    
    logout(){
        auth.logout()
    }

    

  render(){
      const {id, username} = this.state.user;

      return (
          <div>
          <h4>{username}</h4>
        
        <TodoList />
        <Logout handleClick={this.logout} />
          </div>
      );    
  }
}



const root = document.getElementById('root')
ReactDOM.render(<App />, root)