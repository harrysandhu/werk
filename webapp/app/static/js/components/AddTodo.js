import React, { Component } from 'react'

var uf = require('../functions/user_functions')

export default class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // current value in input field
            value: '',
            //use as a way to keep track of when to 'refresh' the input field
            submitted: false
        }

        this.handleForm = this.handleForm.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }
    //handles the form submission
    handleForm(e){
        //get input "value" from state var
        var {value} = this.state
        // check if value empty, or a bunch of whitespaces
        if(value.trim() !== ""){
            // [ON INPUT VALUE] set submitted to true, which will act as a trigger to refresh the state variable and input 'value'   
            this.setState({submitted:true})
            //return the function (and trigger), passed from props
           this.props.handleForm(value)
           
        }
        e.preventDefault()
    }

    handleInput(e){
        //update the state, as the user types in input field
        this.setState({submitted: false, value:e.target.value})
        e.preventDefault()
    }

  render() {
    return (
      <div>
      <form onSubmit={this.handleForm }  >

        <input type="text" 
            onChange={this.handleInput} 
            value={this.state.submitted ? '': this.state.value } 
            placeholder="Add Task"/>

        <input type="submit" 
            value="Add"/>

    </form>
      </div>
    )
  }
}
