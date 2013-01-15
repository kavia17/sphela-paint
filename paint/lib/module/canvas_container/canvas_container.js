(function() {
  if (Meteor.isClient) {
    console.log('client');
  }
  if (Meteor.isServer) {
    console.log('server');
  }
}());
