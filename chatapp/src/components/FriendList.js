import React, { Component } from 'react'
import FriendStore from '../stores/FriendStore'
import Friend from '../components/Friend'

class FriendList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.item.name,
            _id: this.props.item._id,
            userFriends: []
        }

        this.friendStore = new FriendStore();
    }

    componentDidMount() {
        this.friendStore.getFriendsForSpecificUser(this.state._id);
        this.friendStore.emitter.addListener('GET_SPECIFIC_FRIENDS_SUCCESS', () => {
            this.setState({
                userFriends: this.friendStore.specificFriendsDb
            });
        });

        console.log(this.friendStore.specificFriendsDb);
    }

    render() {
        return (
            <div>
                Friend list for user: {this.state.name}, {this.state._id}
                <div id="friends-container">
                    {
                        this.state.userFriends.map((e, i) =>
                            <Friend item={e} key={i} onSelect={this.onSelect}/>)
                    }
                </div>
            </div>
        )
    }
}

export default FriendList