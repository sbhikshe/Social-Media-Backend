const userData = [
  { username: 'JaneAusten', email: 'jane.austen@gmail.com' },
  { username: 'MarkTwain', email: 'mark_twain@yahoo.com' },
  { username: 'AAMilne', email: 'aa_milne@yahoo.com' },
  { username: 'JohnW', email: 'john.wayne@gmail.com' },
  { username: 'AnnieZ', email: 'annie.z@gmail.com' },
  { username: 'NadiaV', email: 'nadia_v@yahoo.com' },
  { username: 'EmmaJ', email: 'emma.jones@gmail.com' },
  { username: 'KenT', email: 'ken.thompson@gmail.com' },
  { username: 'DirkS', email: 'dirk.s@gmail.com' },
];
const thoughtData = [
  { 
    thoughtText: "Life seems but a quick succession of busy nothings.", 
    username: 'JaneAusten'
  },
  { 
    thoughtText: "It isnt what we say or think that defines us, but what we do.", 
    username: 'JaneAusten'
  },
  { 
    thoughtText: "The secret of getting ahead is getting started.", 
    username: 'MarkTwain'
  },
  { 
    thoughtText: "The human race has one really effective weapon, and that is laughter.", 
    username: 'MarkTwain'
  },
  { 
    thoughtText: "Rivers know this: there is no hurry. We shall get there some day.", 
    username: 'AAMilne'
  },
  { 
    thoughtText: "The things that make me different are the things that make me.", 
    username: 'AAMilne'
  },
];

const reactionData = [
  { reactionBody: "So true!", username:"JohnW" },
  { reactionBody: "Lol!", username:"AnnieZ" },
  { reactionBody: "Like!", username:"NadiaV" },
  { reactionBody: "huh?", username:"EmmaJ" },
  { reactionBody: "Hmmm", username:"KenT" },
  { reactionBody: "Yep!", username:"DirkS" },
];

/* add reactions to thoughts */
for (let i = 0; i < thoughtData.length; i++) {
  let reactionsArr = [];
  for (let j = 0; j < 2; j++) {
    reactionsArr.push(reactionData[Math.floor(Math.random() * reactionData.length)]);
  }
  thoughtData[i].reactions = reactionsArr;
}

module.exports = { userData, thoughtData, reactionData };
