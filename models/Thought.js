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
    default: Date.now 
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
    virtuals: true
  },
  /* don't return the id of the reactions */
  id: false, 
}
);
thoughtSchema.methods.getDate = function() {
  return this.createdAt.toDateString();
};

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);
module.exports = Thought;
