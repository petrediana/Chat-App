import { EventEmitter } from 'fbemitter'
const SERVER = 'http://localhost:8080';

class ConversationStore {
    constructor() {
        this.emitter = new EventEmitter();
        this.conversationsDb = [];
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