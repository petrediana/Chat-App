const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message: { type: String, require: true },
    info: { type: String, require: true },
    saidBy: { type: mongoose.Schema.Types.ObjectId, require: true },
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', require: true }
});

module.exports = mongoose.model('Message', messageSchema);