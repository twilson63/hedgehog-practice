app.controller('LeadersCtrl', function($scope, socket) {
  $scope.hogs = [];
  // insert leaders code here
  socket.on('addHog', function(hog) {
    $scope.hogs.push(hog);
  });
  socket.emit('hogs');
});