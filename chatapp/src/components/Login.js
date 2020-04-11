import React, { Component } from 'react'
import UserStore from '../stores/UserStore'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersDb: [],
            userId: null
        };

        this.store = new UserStore();
        
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name] : evt.target.value
            });
            //console.log('Handle change (userId): ' + this.state.userId);
        };

        this.handleClick = (evt) => {
            if (evt.target.name === 'login-user-btn') {
                console.log('this.state.usersDb: ');
                console.log(this.state.usersDb);
                
                const user = this.state.usersDb.filter(user => {
                    if (String(user._id) === String(this.state.userId)){
                        return user;
                    }
                });

                if (user.length > 0) {
                    console.log('User exists');
                } else {
                    console.log('User does not exist!');
                }
            }
        };
    }

    componentDidMount() {
        this.store.getUsers();
        this.store.emitter.addListener('GET_USERS_SUCCES', () => {
            this.setState({
                usersDb: this.store.usersDb
            });
        });

        console.log('componenetDidMount -- Login.js -- ');
        console.log(this.store.usersDb);
    }

    render() {
        return (
            <div>
                Insert user id <br></br>
                <input type="text" id="login-user-txt" name="userId" onChange={this.handleChange}/>
                <input type="button" id="login-user-btn" name = "login-user-btn" value="login" onClick={this.handleClick}/>
            </div>
        )
    }
}

export default Login