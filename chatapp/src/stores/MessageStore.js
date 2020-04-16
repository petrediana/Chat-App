import EventEmitter from 'fbemitter'
const SERVER = 'http://localhost:8080';

class MessageStore {
    constructor() {
        this.emitter = new EventEmitter(),
        this.specificMessages = []
    }

    async getSpecificMessagesForConversation(conversationId) {
        try {
            const request = await fetch(`${SERVER}/message-api/messages/specific-conversation`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(conversationId)
            });
            const response = await request.json();
            response.forEach(specificMessage => {
                this.specificMessages.push(specificMessage)
            });

            this.emitter.emit('GET_SPECIFIC_MESSAGES_SUCCESS');
        } catch(err) {
            console.warn(err);
            this.emitter.emit('GET_SPECIFIC_MESSAGES_ERROR');
        }
    }
}