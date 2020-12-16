const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    primaryMode: {
        type: String,
        required: true
    },
    points:{
        type: String,
        required: true
    }
});

//create coolection and add schema

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;