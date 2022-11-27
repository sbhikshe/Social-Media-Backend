const db = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { userData, thoughtData } = require('./data');

/* once the mongoose has connected to the db */
db.once('open', async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});

  /* insert thoughts into the db to get the ids */
  const thoughts =await Thought.insertMany(thoughtData);

  /* Add the thought ids to the users - adding thoughts only for the first 3 users */
  /* Assume the rest of the users react to the thoughts of these 3 */
  userData[0].thoughts = [thoughts[0]._id, thoughts[1]._id];
  userData[1].thoughts = [thoughts[2]._id, thoughts[3]._id];
  userData[2].thoughts = [thoughts[4]._id, thoughts[5]._id];
  
  const users = await User.insertMany(userData);

  /* add friends */
  for(var i = 0; i < userData.length; i++) {
    let friendsArr = [];
    for (var j = 0; j < 3; j++) {
      let randNum = Math.floor(Math.random() * userData.length);
      /* don't add user to his own friends' list */
      if (randNum !== i) {
        friendsArr.push(users[randNum]._id);
      }
    }
    //users[i].friends = friendsArr;  
    await User.findOneAndUpdate(
      { _id: users[i]._id}, 
      { friends: friendsArr});
  }
  //await User.updateMany(users);

  process.exit(0);
});