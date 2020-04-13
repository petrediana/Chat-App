import React, { Component } from 'react'
import ConversationStore from '../stores/ConversationStore'

class Conversation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conversationDb: null,
            friend1_id: this.props.item.P1._id,
            friend2_id: this.props.item.P2._id
        };

        this.conversationStore = new ConversationStore();

        this.cancel = () => {
            this.props.onCancel();
        };
    }

    componentDidMount() {
        this.conversationStore.getSpecificConversationBetweenFriends(this.state.friend1_id,
                this.state.friend2_id);

    }

    render() {
        let { item } = this.props;
        return (
            <div>
                <input type="button" name="back" value="back" onClick={this.cancel}/>
                <br></br>
                Conversation between: {item.P1.name} and {item.P2.name}
            </div>
        )
    }
}

export default Conversation