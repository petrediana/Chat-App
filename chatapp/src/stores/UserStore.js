import { EventEmitter } from 'fbemitter'
const SERVER = 'http://localhost:8080';

class UserStore {
    constructor() {
        this.emitter = new EventEmitter();
        this.usersDb = [];
    }

    // returns all the users from the db
    async getUsers() {
        try {
            const request = await fetch(`${SERVER}/user-api/users`);
            const response = await request.json();

            response.forEach(user => {
                this.usersDb.push({
                    _id: user._id,
                    name: user.name
                });
            });

            this.emitter.emit('GET_USERS_SUCCESS');
        } catch(err) {
            console.warn(err);
            this.emitter.emit('GET_USERS_ERROR');
        }
    }
}

export default UserStore