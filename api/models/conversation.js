const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    P1: { type: mongoose.Schema.Types.ObjectId },
    P2: { type: mongoose.Schema.Types.ObjectId }
});

module.exports = mongoose.model('Conversation', conversationSchema);