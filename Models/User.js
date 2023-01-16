const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema (
{
    username: {
        type: String,
        required: true,
        unique: true,
        trimmed: true,
        },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought',
            },
    ],
    friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
    ],
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('getFriends')
  // Getter
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema)
module.exports = User