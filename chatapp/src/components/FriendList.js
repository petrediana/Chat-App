import React, { Component } from 'react'
import FriendStore from '../stores/FriendStore'
import Friend from '../components/Friend'
import Conversation from '../components/Conversation'

class FriendList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.item.name,
            _id: this.props.item._id,
            userFriends: [],
            selectedFriend: null,
            conversationData: {
                P1: null,
                P2: null
            }
        }

        this.friendStore = new FriendStore();

        this.select = (friend) => {
            const obj = {
                P1: this.props.item,
                P2: friend
            };

            this.setState({
                selectedFriend : friend,
                conversationData: obj
            });
        }

        this.cancel = () => {
            this.props.onCancel();
        };

        this.cancelConversation = () => {
            this.setState({
                conversationData: {
                    P1: null,
                    P2: null
                }
            })
        }
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
        if (this.state.conversationData.P1 && this.state.conversationData.P2) {
            return <Conversation item={this.state.conversationData} onCancel={this.cancelConversation}/>
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