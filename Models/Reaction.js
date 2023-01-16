const { Schema } = require('mongoose');
const { ObjectId } = require('bson')

const reactionSchema = new schema (
    {
        reactionId: {
            type: ObjectId, 
            default: new ObjectId,
        },
        reactionBody: {
            type: String,
            require: true,
            maxLength: 280
        },
        username:{
            type: String,
            require: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)
