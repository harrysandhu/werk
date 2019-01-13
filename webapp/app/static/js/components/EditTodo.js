
import React, { Component } from 'react'

export default class EditTodo extends Component{
constructor(props) {
    super(props);
    this.state = {
        value : this.props.content
    }
    this.handleSave = this.handleSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
}

handleSave(){
    const {value} = this.state
    this.props.handleUpdate(value)
}

handleChange(e){
    e.preventDefault()
    this.setState({value:e.target.value})
}

render(){
    
    return (
        <div>
        <input onChange={this.handleChange} value={this.state.value} />
        <button onClick={this.handleSave}>Save</button>
        <button onClick={this.props.onCancel}>Cancel</button> 
        </div>
    )
} 


}