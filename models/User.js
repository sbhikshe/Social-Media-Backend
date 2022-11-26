const { Schema, model } = require('mongoose');

/* set up the schema for a user */
const userSchema = new Schema({
  username: { 
    type: String, 
    unique: true,
    required: true, 
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    //validate: [isEmailValid, 'email not valid'],
  },
  thoughts: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'thought'
    }
  ],
  friends: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'user'
    }
  ]
},
{
  toJSON: {
    /* to allow virtuals to be included in the response */
    virtuals: true
  }
}
);

/*
function isEmailValid(inputStr) {
  const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return re.test(inputStr);
}
*/

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

/* set the model with the schema */
const User = model('user', userSchema);

/* export the model */
module.exports = User;
