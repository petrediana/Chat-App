import { EventEmitter } from 'fbemitter'
const SERVER = 'http://localhost:8080';

class ConversationStore {
    constructor() {
        this.emitter = new EventEmitter();
        this.conversationsDb = [];
        this.specificConversation = null;
    }

    async getConversations() {
        try {
            const request = await fetch(`${SERVER}/conversation-api/conversations`);
            const response = await request.json();
    
            response.forEach(conversation => {
                this.conversationsDb.push({
                    _id: conversation._id,
                    P1: conversation.P1,
                    P2: conversation.P2
                });
            });

            this.emitter.emit('GET_CONVERSATIONS_SUCCESS');
        } catch(err) {
            console.warn(err);
            this.emitter.emit('GET_CONVERSATIONS_ERROR');
        }
    }

    async getSpecificConversationBetweenFriends(friend1_id, friend2_id) {
        try {
            const request = await fetch(`${SERVER}/conversation-api/conversations`);
            const response = await request.json();
    
            response.forEach(conversation => {
                if (String(conversation.P1) === String(friend1_id)
                    && String(conversation.P2) === String(friend2_id)) {
                        this.specificConversation = conversation;
                    } else {
                        if (String(conversation.P1) === String(friend2_id)
                            && String(conversation.P2) === String(friend1_id)) {
                                this.specificConversation = conversation;
                            }
                    }
    
            });

            this.emitter.emit('GET_SPECIFIC_CONVERSATION_SUCCESS');
        } catch(err) {
            console.warn(err);
            this.emitter.emit('GET_SPECIFIC_CONVERSATION_ERROR');
        }
    }

    async createConversation(conversation) {
        try {
            await fetch(`${SERVER}/conversation-api/conversations`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(conversation)
            });
        } catch(err) {
            console.warn(err);
            this.emitter.emit('ADD_CONVERSATION_ERROR');
        }
    }
}

export default ConversationStore;