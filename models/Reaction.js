const { Schema, Types } = require('mongoose');

/* set up the schema for a reaction, and export the schema only, no model */
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: { 
      type: String, 
      required: true, 
      maxLength: 280 
    },
    username: { 
      type: String, 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now,
      get: getDate 
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);
function getDate(createdAt) {
  return createdAt.toString();
}

module.exports = reactionSchema;
