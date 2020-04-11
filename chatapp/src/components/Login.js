import React, { Component } from 'react'
import UserStore from '../stores/UserStore'

class Login extends Component {
    constructor() {
        this.state = {
            usersDb: [],
            userId: null
        };

        this.store = new UserStore();
        
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name] : evt.target.value
            });
        }
    }

    componentDidMount() {
        this.store.getUsers();
        this.store.emitter.addListener('GET_USERS_SUCCES', () => {
            this.setState({
                usersDb: this.store.usersDb
            });
        });

        console.log('componenetDidMount -- Login.js -- ');
        console.log(this.state.usersDb);
    }

    render() {
        return (
            <div>
                Insert user id <br></br>
                <input type="text" id="login-user-txt" />
                <input type="button" id="login-user-btn" value="login" />
            </div>
        )
    }
}

export default Login