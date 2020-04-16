import React, { Component } from 'react'
import ConversationStore from '../stores/ConversationStore'

class Conversation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conversations: [],
            coversation_id: 0,
            friend1_id: this.props.item.P1._id,
            friend2_id: this.props.item.P2._id
        };

        this.conversationStore = new ConversationStore();

        this.cancel = () => {
            this.props.onCancel();
        };
    }

    componentDidMount() {
        this.conversationStore.getSpecificConversation(this.state.friend1_id, this.state.friend2_id);
        this.conversationStore.emitter.addListener('GET_SPECIFIC_CONVERSATION_SUCCESS', () => {
            this.setState({
                conversation_id: this.conversationStore.specificConversation
            });
        });
        console.log('componentDidMount >:(');
        console.log(this.conversationStore.specificConversation);
    }

    render() {
        let { item } = this.props;
        return (
            <div>
                <input type="button" name="back" value="back" onClick={this.cancel}/>
                <br></br>
                Conversation between: {item.P1._id} and {item.P2._id}
                <div id='message-box-container'>

                </div>
            </div>
        )
    }
}

export default Conversation