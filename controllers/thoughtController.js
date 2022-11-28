const { User, Thought, Reaction } = require('../models');

/* Export handler functions for all the thoughts routes */

module.exports = {

/* get all thoughts for all users */  
getThoughts(req, res) {
  Thought.find()
  .then((results) => res.status(200).json(results)) 
  .catch((err) => res.status(500).json(err));
},

/* post a new thought, and update the thoughts list for the user that's posting */
postThought(req, res) {
  Thought.create(req.body)
  .then((results) => {
    User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { thoughts: results._id}, },
      { runValidators: true, new: true }
    )
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => res.status(500).json({ message: 'error updating user with new thought'}));
  })
  .catch((err) => res.status(500).json({ message: 'error posting the thought'}));
},

/* get a thought by its id */
getOneThought(req, res) {
  Thought.findOne({ _id: req.params.thoughtId })
  .then((results) => res.status(200).json(results)) 
  .catch((err) => res.status(500).json(err));
},

/* make changes to a thought */
updateOneThought(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId }, 
    { $set: req.body },
    { runValidators: true, new: true })
  .then((results) => res.status(200).json(results)) 
  .catch((err) => res.status(500).json(err));
},

/* remove a thought, also remove it from the its owner's thoughts list */
deleteOneThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.thoughtId })
  .then((results) => {
    User.findOneAndUpdate(
      { username: results.username },
      { $pull: { thoughts: results._id}, },
      { runValidators: true, new: true }
    )
    .then((results) => {
      /* return user showing thought deleted from the thoughts list */
      res.status(200).json(results);
    })
    .catch((err) => res.status(500).json({ message: 'error removing thought from user'}));
  }) 
  .catch((err) => res.status(500).json(err));
},

/* post a reaction to a thought */
postReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true })
  .then((results) => res.status(200).json(results)) 
  .catch((err) => res.status(500).json(err));
},

/* remove a reaction to a thought - look up by thoughtId first */
/* and reactionId included in the req body */
deleteReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { _id: req.params.reactionId } } },
    { runValidators: true, new : true })
  .then((results) => res.status(200).json(results)) 
  .catch((err) => res.status(500).json(err));
}
};