const {Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought")

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Must match an email address!"],
    },
    thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    },
    {
        toJSON: {
            virtuals: true,

        },
        id: false
})

userSchema
    .virtual("getFriends")
    .get(function() {
        return this.friends.length
    })

const User = model("User", userSchema)

module.exports = User