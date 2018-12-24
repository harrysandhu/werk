import React, { Component } from 'react'
import TodoStore from '../stores/TodoStore'
import TodoActions from '../actions/TodoActions'


export default class EditMode extends Component{
    constructor(props) {
        super(props);
        this.state = {

            value: this.props.content
        }
    }
    componentWillMount(){}

    handleChange(e){
        e.preventDefault()  
        this.setState({value : this.props.content + e.target.value})
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleEditForm} >
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="update" />
                </form>
            </div>
        );
    }
}