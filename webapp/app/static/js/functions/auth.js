import axios from 'axios'



module.exports = {
    loginFormProcess: function(self){
        var { username, password} = self.state
        self.setState({'error':''})
        if (username == '' || password == ''){
            self.setState({'error':'Invalid username/password'})
        }else{
            axios({
                method: 'POST',
                url: '/login',
                data : {
                    username : username,
                    password : password
                }
            }).then(response => {
                if (response.data.success){
                    window.location.replace('/')
                       console.log(response.data)
                        return true
                }else{
                    self.setState({error:response.data.error})
                    return false
                }
            })
        }
    },
    logout : function(){
        axios({
            method : 'GET',
            url: '/logout'
        }).then(
            response => {
                if(response.data.success){
                     window.location.replace('/')
                    console.log('logged out')
                    return true
                }
            }
        )
    
    }
}