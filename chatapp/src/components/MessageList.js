import React, { Component } from 'react'
import MessageStore from '../stores/MessageStore'

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conversationId: this.props.item,
            messages: []
        }

        this.messageStore = new MessageStore();
    }

    componentDidMount() {
        this.messageStore.getSpecificMessagesForConversation(conversationId);
        this.messageStore.emitter.addListener('GET_SPECIFIC_MESSAGES_SUCCESS', () => {
            this.setState({
                messages: this.messageStore.specificMessages
            });
        });
    }
}

export default MessageList