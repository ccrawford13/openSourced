// Fixture data
if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  var tomId = Meteor.users.insert({
    profile: {
      name: 'Tom Coleman'
    }
  });
  // User userId to grab the user from db
  // to reference that user in post & comment
  var tom = Meteor.users.findOne(tomId);

  var sachaId = Meteor.users.insert({
    profile: {
      name: 'Sacha Greif'
    }
  });
  var sacha = Meteor.users.findOne(sachaId);

  for (var i = 1; i <= 10; i++) {
    Posts.insert({
      title: 'Test Post #' + i,
      userId: tom._id,
      author: tom.profile.name,
      url: 'http://google.com/?q=test-' + i,
      description: (10 - i) + ': Test posts remaining',
      submitted: new Date(now - i * 3600 * 1000),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });
  }

  // Set post name(nameId) eql to insert function
  // to reference in comment creation
  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    userId: sacha._id,
    author: sacha.profile.name,
    url: 'http://sachagreif.com/introducing-telescope/',
    description: 'Super responsive social platform',
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2,
    upvoters: [],
    votes: 0
  });

  var meteorId = Posts.insert({
    title: 'Meteor',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://meteor.com',
    description: 'Awesome full-stack Javscript App platform',
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 1,
    upvoters: [],
    votes: 0
  });

  var meteorBookId = Posts.insert({
    title: 'The Meteor Book',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://themeteorbook.com',
    description: 'Great way to learn to build apps with Meteor',
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [],
    votes: 0
  });

  Comments.insert({
    postId: telescopeId,
    userId: tom._id,
    author: tom.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting project Sacha, can I get involved?'
  });

  Comments.insert({
    postId: telescopeId,
    userId: sacha._id,
    author: sacha.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'You sure can Tom!'
  });

  Comments.insert({
    postId: meteorId,
    userId: sacha._id,
    author: sacha.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Awesome project Tom, can I help out?'
  });
}
