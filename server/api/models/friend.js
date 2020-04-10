const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, require: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true}
});

module.exports = mongoose.model('Friend', friendSchema);