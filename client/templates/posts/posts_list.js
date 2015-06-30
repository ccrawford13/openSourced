var postData = [{
  title: 'Introducing Telescope',
  url: 'http://sachagrief.com/introducting-telescope'
}, {
  title: 'Meteor',
  url: 'http://meteor.com'
}, {
  title: 'The Meteor Book',
  url: 'http://themeteorbook.com'
}];

Template.postsList.helpers({
  posts: postData
});
