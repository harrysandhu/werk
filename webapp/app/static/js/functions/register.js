import axios from 'axios';




module.exports = {

    handleUsername: function(self, username) {
        //check length


        self.setState({
            username_status: ''
        })
        if (username.length < 3) {

            self.setState({
                username_status: 'Username must be minimum 3 characters long.'
            })
            console.log('x')
            return false
        } else if (username.length > 3) {

            self.setState({
                username_status: ''
            })

        }

        username = username.toLowerCase();
        var username_regex = /^[a-zA-Z0-9._]*$/
        if (!username_regex.test(username)) {
            console.log(username_regex.test(username))

            self.setState({
                username_status: 'Username not allowed'
            })
            return false
        } else {
            //GET request-> username return true if not found else false

            axios({
                method: 'GET',
                url: '/api/user',
                params : {
                    username : username
                }
            }).then((response) => {
                console.log(response)
                if (response.data.error) {
                    //API returned no record
                    //username is not taken
                    //AVAILABLE : TRUE
                    self.setState({
                        username_status: ''
                    })
                    return true
                } else if (response.data.username) {
                    self.setState({
                        username_status: 'Username not available!'
                    })
                    return false
                }
            }).catch((error) => {
                return false
            })
        }
        //
    },

    handlePassword: function(self, password2) {

        self.setState({
            password_status: ''
        })
        var {
            password
        } = self.state

        if (password.length < 8) {
            self.setState({
                password_status: 'Password should be at least 8 characters long.'
            })
            return false;
        } else if (password !== password2) {
            self.setState({
                password_status: 'Passwords do not match.'
            })
            return false
        } else {
            self.setState({
                password_status: ''
            })
            return true
        }
    },


    handleSignupForm: function(self) {
        const {
            username,
            password,
            password2,
            username_status,
            password_status
        } = self.state

        
            self.setState({
                username_status: ''
            })
            axios({
                url: '/signup',
                method: 'POST',
                data: {
                    username: username,
                    password: password,
                    password2: password2
                },
                headers : {
                    'Content-Type':'application/json'
                }
            }).then(
                (response) => {
                    if (response.data.success) {
                       window.location.replace('/')
                       console.log(response.data)
                        return true
                    } else if (response.data.error) {
                
                            console.log(response.data.errors)
                     
                        self.setState({
                            username_status: 'Something went wrong!'
                        })
                        return false
                    }
                }
            ).catch(error => {
                return false
            })
        }
    
}