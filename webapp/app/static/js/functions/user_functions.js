import axios from 'axios'

module.exports = {
    getUserData : function(self){
       var user = {}
        axios({
            method : 'GET',
            url: '/api/session'
        }).then(response => {
            if(response.data.user){
                user = response.data.user;
                self.setState({'user':user})
                console.log(self.state.user)
                return true;
            }else if(response.data.error){
                return false;
            }
        })
    },
 /*
    * @param self
    * axios request : POST 
    * api/todo 
    * sets state : todos
    * @returns bool
    */
    addTodo : function(data, self){
        const todo = data

        axios({
            method:'POST',
            url: 'api/todo',
            data: {
                todo:todo

            }
        }).then(response => {
            if(response.data.success){
                return true;
            }else{
                console.log(response.data)
                return false;
            }
        })
    },
    /*
    * @param self
    * axios request : GET 
    * gets todos from api/todo with id as session['id']
    * sets state : todos
    * @returns bool
    */
    getTodos : function(self){

        axios({
            method:'GET',
            url:'api/todos',
            
        }).then(response =>{
            if(response.data.success){
                //array of 'todo' objects
                console.log(response.data.todos)
                self.setState({todos:response.data.todos})
                
                return true;
            }else{
                return false;
            }
        })
    },
     getTodo : function(self){
         var id = self.props.viewId
        axios({
            method:'GET',
            url:'api/get_todo',
            
        }).then(response =>{
            if(response.data.success){
                //array of 'todo' objects
                console.log(response.data.todos)
                self.setState({todos:response.data.todos})
                
                return true;
            }else{
                return false;
            }
        })
    },
    toggleTodoStatus: function(self){
        const { id, status} = self.state
        console.log(id)
        axios({
            method:'POST',
            url: 'api/todo/status',
            data : {
                id : id,
                status : status
            }
        }).then(response => {
            console.log(response.data.success)
            if(response.data.success){
                self.setState({status:response.data.status})
                return true
            }else{
                return false
            }
        })
    },
   
}