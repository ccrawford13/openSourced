Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('notifications');
  }
});

// Welcome Page
Router.route('welcome', {
  name: 'welcome'
});

// Individual post with data context
// matching the params of the route
Router.route('posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() {
    return Posts.findOne(
      this.params._id
    );
  }
});

// Edit post
Router.route('posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() {
    return Meteor.subscribe('singlePost', this.params._id);
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


PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {
      sort: {
        submitted: -1
      },
      limit: this.postsLimit()
    };
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    var nextPath = this.route.path({
      postsLimit: this.postsLimit() + this.increment
    });

    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  }
});
// List of posts
Router.route('/:postsLimit?', {
  name: 'postsList'
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
