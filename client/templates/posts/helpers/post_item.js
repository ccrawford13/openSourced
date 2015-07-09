Template.postItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'post__upvote';
    } else {
      return 'post__upvote--disabled';
    }
  }
});

Template.postItem.events({
  'click .post__upvote': function(e) {
    e.preventDefault();

    Meteor.call('upvote', this._id);
  }
});
