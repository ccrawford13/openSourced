Comments = new Mongo.Collection("comments");

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String
    });
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
    if (!post) {
      throw new Meteor.Error('invalid-comment',
        'Your comment cannot be blank');
    }
    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    // Increment the posts 'commentCount' value
    Posts.update(comment.postId, {
      $inc: {
        commentsCount: 1
      }
    });

    // create the comment, save the id
    comment._id = Comments.insert(comment);
    // create notification, informing user there's been a comment
    createCommentNotification(comment);
    return comment._id;
  }
});
