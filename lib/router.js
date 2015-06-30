Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe("posts");
  }
});

Router.route('welcome', {
  name: 'welcome'
});

Router.route('/', {
  name: 'postsList'
});
