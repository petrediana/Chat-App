const express =  require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Message = require('../models/message');

router.get('/', (req, res, next) => {
    Message.find()
    .select('_id message info saidBy conversationId')
    .exec()
    .then(docs => {
        console.log('From db: ' + docs);  
        if (docs.length > 0) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message : 'No data available'
            });
        }
    })
    .catch(err => {
        console.warn(err);
        next(err);
    });
});

// get all messages for a user
router.get('/:userId', async (req, res, next) => {
    try {
        const userIdParam = req.params.id;
        const allMessages = await Message.find().select('_id message info saidBy conversationId');
        const theUsersMessages = allMessages.map(message => {
            if (String(message.saidBy) === String(userIdParam)) {
                return message;
            }
        });
        
        res.status(200).json({
            userId: userIdParam,
            messageCount: message.length,
            messages: theUsersMessages
        });
    } catch(err) {
        console.warn(err);
        next(err);
    }
});

// get all messages for a conversation
router.post('/specific-conversation', async(req, res, next) => {
    try {
        const allMessages = await Message.find().select('_id message info saidBy conversationId');;
        const conversationId = req.body.conversationId;
        const conversationMessages = allMessages.filter(message => {
            if (String(message.conversationId) === String(conversationId)) {
                return message;
            }
        });

        res.status(200).json(conversationMessages);
    } catch(err) {
        console.warn(err);
        next(err);
    }
});

router.post('/', (req, res, next) => {
    try {
        const dbMessage = new Message({
            _id: new mongoose.Types.ObjectId(),
            message: req.body.message,
            info: req.body.info,
            saidBy: req.body.saidBy,
            conversationId: req.body.conversationId
        });
        dbMessage.save();
        res.status(201).json({
            message: 'Message created',
            createdMessage: dbMessage
        });
    } catch(err) {
        console.warn(err);
        next(err);
    }
});

module.exports = router;