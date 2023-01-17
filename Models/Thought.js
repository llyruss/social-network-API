const {Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction")

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
        minLength: 1
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    userName:  {
        type: Schema.Types.String,
        ref: "User"
    },
    content: {
        type: String,
        maxLength: 500,
    },
    reactions: [reactionSchema]
})

const Thought = model("Thought", thoughtSchema)

module.exports = Thought