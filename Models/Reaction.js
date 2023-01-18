const { ObjectId } = require("bson");
const {Schema} = require("mongoose");

const reactionSchema = new Schema({
    // reactionId: {
    //     type: ObjectId,
    //     default: new ObjectId
    // },
    
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    userName: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
})

module.exports = reactionSchema
