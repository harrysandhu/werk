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
    * @param todo
    * axios request : POST 
    * api/todo
    * @returns a Promise
    */
    createTodo : (todo) => {
        return new Promise((resolve, reject) => {
            resolve(
                axios({
                    method : 'POST',
                    url: 'api/todo',
                    data : {
                        todo:todo
                    }
                })
            );
            reject('Something went wrong!')
        })
    },
    /*
    * @param self
    * axios request : GET 
    * gets todos from api/todo with id as session['id']
    * sets state : todos
    * @returns bool
    */
    receiveTodos : function(){
        return new Promise((resolve, reject) => {
            resolve(
                axios({
                    method: 'GET',
                    url: 'api/todos'
                })
            )
            reject('Something went wrong!')
        })
    },
    toggleTodo: function(id, status){
        return new Promise((resolve, reject) => {
            resolve(
                    axios({
                    method:'POST',
                    url: 'api/todo/status',
                    data : {
                        id : id,
                        status : status
                    }
                })
            )
            reject('Something went wrong!')
        })

    },
   
   deleteTodo: function(id){
        return new Promise((resolve, reject) => {
            resolve(
                    axios({
                    method:'POST',
                    url: 'api/todo/delete',
                    data : {
                        id : id
                    }
                })
            )
            reject('Something went wrong!')
        })

    },
}