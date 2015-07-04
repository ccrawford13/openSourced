Posts = new Mongo.Collection('posts');

// global variable that can be called
// anywhere as long as we pass in a post obj
// this could be refactored into separate file
// as additional validations are added
validatePost = function(post) {
  var errors = {};
  if (!post.title) {
    errors.title = "Please give your project a name";
  }
  if (!post.url) {
    errors.url = "Please give the url to your project repo";
  }
  if (!post.description) {
    errors.description = "Please describe your project";
  }
  return errors;
}

Posts.allow({
  update: function(userId, post) {
    return ownsDocument(userId, post);
  },
  remove: function(userId, post) {
    return ownsDocument(userId, post);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url || errors.description;
  }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    return (_.without(fieldNames, 'url', 'title', 'description').length >
      0);
  }
});

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      description: String,
      url: String
    });

    var errors = validatePost(postAttributes);
    if (errors.title || errors.url || errors.description) {
      throw new Meteor.Error('Invalid post',
        "You must have a Title, URL, and Description for your project");
    }

    var postWithSameLink = Posts.findOne({
      url: postAttributes.url
    });

    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    };

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});
