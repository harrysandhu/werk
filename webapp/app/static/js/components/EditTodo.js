import React, {Component } from 'react'

export default class EditTodo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value : this.props.todo
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }
    handleChange(e){
        this.setState({value: e.target.value})

    }

    handleSave(){
        const {value} = this.state
        if (value != ''){
            this.props.save(value)
        }
    }
    render(){
        return(
            <div>
            <input value={this.state.value} onChange={this.handleChange} />
            <button onClick={this.handleSave}>Save</button>
            </div>
        )
    }
    
}