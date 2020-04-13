import React, { Component } from 'react'
import FriendStore from '../stores/FriendStore'
import Friend from '../components/Friend'

class FriendList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.item.name,
            _id: this.props.item._id,
            userFriends: [],
            selectedFriend: null
        }

        this.friendStore = new FriendStore();

        this.select = (friend) => {
            this.setState({
                selectedFriend: friend
            });
        }

        this.cancel = () => {
            this.props.onCancel();
        };
    }

    componentDidMount() {
        this.friendStore.getFriendsForSpecificUser(this.state._id);
        this.friendStore.emitter.addListener('GET_SPECIFIC_FRIENDS_SUCCESS', () => {
            this.setState({
                userFriends: this.friendStore.specificFriendsDb
            });
        });
    }

    render() {
        if (this.state.selectedFriend) {
            return <div>Friend selected</div>
        } else {
        return (
                <div>
                    <input type="button" name="back-btn" value="back" onClick={this.cancel}/>
                    <br></br>
                    Friend list for user: {this.state.name}, {this.state._id}
                    <div id="friends-container">
                        {
                            this.state.userFriends.map((e, i) =>
                                <Friend item={e} key={i} onSelect={this.select}/>)
                        }
                    </div>
                </div>
            )
        }
    }
}

export default FriendList