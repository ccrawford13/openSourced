if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Introducing Telescope',
    description: 'This app is for ...and does ...',
    url: 'http://sachagrief.com/introducing-telescope/'
  });

  Posts.insert({
    title: 'Meteor',
    description: 'This app is great..it does..!',
    url: 'http://meteor.com'
  });

  Posts.insert({
    title: 'The Meteor Book',
    description: 'This thing is unreal..you will love that it...',
    url: 'http://themeteorbook.com'
  });
}
