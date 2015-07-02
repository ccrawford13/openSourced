Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val()
    }

    // Refactor to method call to
    // validate format, length, && uniqueness
    Posts.update(currentPostId, {
      $set: postProperties
    }, function(error) {
      if (error) {
        throwError(error.reason)
      } else {
        Router.go('postPage', {
          _id: currentPostId
        });
      }
    })
  },

  'click .delete__post': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});
