const express =  require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Conversation = require('../models/conversation');

router.get('/', (req, res, next) => {
    Conversation.find()
    .select('_name P1 P2')
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

router.post('/', (req, res, next) => {
    try {
        const dbConversation = new Conversation({
            _id: new mongoose.Types.ObjectId(),
            P1: req.body.P1,
            P2: req.body.P2
        });
        dbConversation.save();
        res.status(201).json({
            message: 'Conversation created',
            createdConversation: dbConversation
        });
    } catch(err) {
        console.warn(err);
        next(err);
    }
});

module.exports = router;