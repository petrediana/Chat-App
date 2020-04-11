import { EventEmitter } from 'fbemitter'
const SERVER = 'http://localhost:8080';

class FriendStore {
    constructor() {
        this.emitter = new EventEmitter();
        this.specificFriendsDb = [];
    }

    async getFriendsForSpecificUser(userId) {
        try {
            const request = await fetch(`${SERVER}/friend-api/friends/user-friends/${userId}`);
            const response = await request.json();

            response.forEach(friend => {
                this.specificFriendsDb.push({
                    _id: friend._id,
                    name: friend.name
                });
            });
            this.emitter.emit('GET_SPECIFIC_FRIENDS_SUCCESS');

        } catch(err) {
            console.warn(err);
            this.emitter.emit('GET_SPECIFIC_FRIENDS_ERROR');
        }
    }
}

export default FriendStore