const { User, Thought, Reaction } = require('../models');

module.exports = {
  /* get all users */
  getUsers(req, res) {
    User.find()
    .then((results) => res.status(200).json(results))
    .catch((err) => res.status(500).json(err));
  },

  /* create a new user */
  postUser(req, res) {
    User.create(req.body)
    .then((results) => res.status(200).json(results))
    .catch((err) => res.status(500).json(err));
  },

  /* get a single user by the userId in the request */
  getOneUser(req, res) {
    User.findOne({_id: req.params.userId})
    .then((results) => res.status(200).json(results))
    .catch((err) => res.status(500).json(err));
  },

  /* update a single user by the userId */
  updateOneUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
    .then((results) => res.status(200).json(results))
    .catch((err) => res.status(500).json(err));
  },

  /* remove one user by the userId and their thoughts */
  deleteOneUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId})
    .then((deletedUser) => {
      /* find and delete the thoughts for this user */
      Thought.deleteMany({username: deletedUser.username})
      .then((thoughts) => {
        /* TBD: also remove the user from other's friend lists ? */
        res.status(200).json(deletedUser);
      })
      .catch((err) => res.status(500).json({message: 'error in removing thoughts for this user'}));
    })
    .catch((err) => res.status(500).json(err));
  },

  /* add a friend id to the user's friends list */
  addFriend(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      { $addToSet: { friends: req.params.friendId }},
      { new: true })
    .then((results) => res.status(200).json(results))
    .catch((err) => res.status(500).json(err));
  },

  /* remove a friend id from the user's friend list */
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId }},
      { new: true })
    .then((results) => res.status(200).json(results))
    .catch((err) => res.status(500).json(err));
  }
};