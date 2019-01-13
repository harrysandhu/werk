import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from './components/loginform'
import RegForm from './components/regForm'
import ModeButton from './components/modeButton'
require('./test')


class Layout extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 'login',
    }
    this.changeMode = this.changeMode.bind(this);

  }
  
  changeMode(e){
    e.preventDefault();
    const {mode} = this.state;
    if(mode == 'login')
      this.setState({mode:'reg'})
    else if (mode == 'reg')
      this.setState({mode:'login'})
  }
  formDisplay() {
     if(this.state.mode == 'login'){
         return(<div> <LoginForm /><ModeButton changeMode={this.changeMode} toMode='Register'/></div>);
          }else if(this.state.mode == 'reg'){
          return(  <div><RegForm /><ModeButton changeMode={this.changeMode} toMode='Login'/></div>);
          }
    
  }
  render() {

    return (
      <div className="main_content">
        <h1 className="main_head">Werk</h1>
        {this.formDisplay()}
      </div>
    )
  }
}




const root = document.getElementById('root')
ReactDOM.render(<Layout />, root)