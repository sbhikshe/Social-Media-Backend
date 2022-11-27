const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

/* set up the schema for a thought, set the model with schema and export */
const thoughtSchema = new Schema({
  thoughtText: { 
    type: String, 
    required: true, 
    minLength: 1, 
    maxLength: 280
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    get: getDate
  },
  username: { 
    type: String, 
    required: true 
  },
  reactions: [Reaction],
}, 
{
  toJSON: {
    /* to allow virtuals to be included in the response */
    virtuals: true,
    /* to allow getters to be called in the response */
    getters: true
  },
  /* don't return the id of the reactions */
  id: false, 
}
);
function getDate(createdAt) {
  return createdAt.toString();
};

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);
module.exports = Thought;
