import { EventEmitter } from 'fbemitter'
const SERVER = 'http://localhost:8080';

class ConversationStore {
    constructor() {
        this.emitter = new EventEmitter();
        this.conversationsDb = [];
        this.specificConversation = 0;
    }

    async getSpecificConversation(friend1_id, friend2_id) {
        try {
            const bodyObj = {
                P1: friend1_id,
                P2: friend2_id
            };

            const request = await fetch(`${SERVER}/conversation-api/conversations/specific-conversation`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyObj)
            });
            const response = await request.json();
            this.specificConversation = response._id;
            /*this.specificConversation = {
                _id: response._id,
                P1: response.P1,
                P2: response.P2
            };*/
            //this.specificConversation.push(response);
            console.log(this.specificConversation);

            this.emitter.emit('GET_SPECIFIC_CONVERSATION_SUCCESS');
        } catch(err) {
            console.warn(err);
            this.emitter.emit('GET_SPECIFIC_CONVERSATION_ERROR');  
        }
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

    /*async getSpecificConversationBetweenFriends(friend1_id, friend2_id) {
        try {
            const request = await fetch(`${SERVER}/conversation-api/conversations`);
            const response = await request.json();
            
            this.specificConversation = 0;

            /*for (let i = 0; i < response.length; ++i) {
                if (String(response[i].P1) === String(friend1_id) &&
                String(response[i].P2) === String(friend2_id)) {
                    this.specificConversation = {
                        _id: response[i]._id,
                        P1: response[i].P1,
                        P2: response[i].P2
                    };
                    break;
                }
            }/*
           // console.log(this.specificConversation)
    
            /*response.forEach(conversation => {
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
    }*/
}

export default ConversationStore;