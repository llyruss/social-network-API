const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const User = require('./User');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String, 
            require: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
                type: Schema.Types.username,
                ref: 'User',
                require: true,
              },
        reactions: [reactionSchema]
    }
)

const Thought = model('thought', userSchema)
module.exports = Thought