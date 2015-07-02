Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val()
    };

    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort on error
      if (error) {
        return throwError(error.reason);
      }

      if (result.postExists) {
        throwError("This link has already been posted");
      }

      Router.go('postPage', {
        _id: result._id
      });
    });
  }
});
