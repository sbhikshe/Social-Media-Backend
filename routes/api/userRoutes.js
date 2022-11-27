const router = require('express').Router();

const {
  getUsers,
  postUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

router.route('/')
.get(getUsers)
.post(postUser);

router.route('/:userId')
.get(getOneUser)
.put(updateOneUser)
.delete(deleteOneUser);

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;