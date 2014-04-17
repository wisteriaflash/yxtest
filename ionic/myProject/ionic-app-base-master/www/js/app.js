// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

function ContentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}
function scrollController($scope, $http){
    $scope.loadMore = function() {
        console.log('ccc');
        $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    $scope.onRefresh = function() {
      $scope.$broadcast('scroll.refreshComplete');
  }
}

function slideController($scope){
    $scope.slideChanged = function(index){
        console.log(index)
    }
    
}