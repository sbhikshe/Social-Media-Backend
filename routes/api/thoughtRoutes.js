const router = require('express').Router();

/* import the handler functions for each route from the thoughts controller */
const {
  getThoughts,
  postThought,
  getOneThought,
  updateOneThought,
  deleteOneThought,
  postReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

router.route('/')
.get(getThoughts)
.post(postThought);

router.route('/:thoughtId')
.get(getOneThought)
.put(updateOneThought)
.delete(deleteOneThought);

router.route('/:thoughtId/reactions')
.post(postReaction)
.delete(deleteReaction);

module.exports = router;