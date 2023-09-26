const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    notes: [{
        type: Schema.ObjectId,
        ref: 'Note'
    }]
});

module.exports = mongoose.model('Group', GroupSchema);
