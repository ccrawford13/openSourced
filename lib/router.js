Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe("posts"), Meteor.subscribe('notifications')];
  }
});

// Welcome Page
Router.route('/', {
  name: 'welcome'
});

// List of posts
Router.route('posts', {
  name: 'postsList'
});

// Individual post with data context
// matching the params of the route
Router.route('posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return Meteor.subscribe('comments', this.params._id);
  },
  data: function() {
    return Posts.findOne(
      this.params._id
    );
  }
});

// Create new post
Router.route('submit', {
  name: 'postSubmit'
});

// Edit post
Router.route('posts/:_id/edit', {
  name: 'postEdit',
  data: function() {
    return Posts.findOne(
      this.params._id
    );
  }
});

var requireLogin = function() {
  if (!Meteor.user()) {
    // while user is loggingIn display LoadingTemplate
    if (Meteor.loggingIn()) {
      this.render(this.LoadingTemplate);
      // if user doesn't exist or is not logged in
      // render accessDenied
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

// Require user to be logged in
Router.onBeforeAction(requireLogin, {
  only: 'postSubmit'
});

// If url does not match route or
// collection in db render 'notFoundTemplate'
Router.onBeforeAction('dataNotFound', {
  only: 'postPage'
});
