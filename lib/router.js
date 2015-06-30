Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'welcome'
});

Router.route('posts', {
  name: 'postsList'
});
