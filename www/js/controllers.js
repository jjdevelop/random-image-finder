angular.module('imagefinder.controllers', [])

.controller('SearchCtrl', function($scope, Flickr) {
	  $scope.photos = [];
    $scope.currentPhoto = null;
    $scope.prevPhoto = null;
    $scope.nextPhoto = null;
    $scope.currentPhotoSrc = '';
    $scope.count = 0;

    $scope.search = function(search){
        $scope.loading = true;
        var promise = Flickr.search(search);
        promise.then(function(data) {
            // $scope.photos = data.photos;
            $scope.photos = data.photos.photo;
            // $scope.page = data.photos.page;
            // $scope.pages = data.photos.pages;
            // $scope.total = data.photos.total;
            $scope.loading = false;
            $scope.count = 0;
            $scope.currentPhoto = data.photos.photo[$scope.count];
        }, function(err) {
            console.log('Failed: ' + err);
            $scope.loading = false;
        });
    }

    $scope.next = function(){
      $scope.count += 1;
      $scope.currentPhoto = $scope.photos[$scope.count];
      console.log('Count:' + $scope.count);
    }

    $scope.prev = function(){
      if ($scope.count > 0) {
        $scope.count -= 1;
        $scope.currentPhoto = $scope.photos[$scope.count];
      }
      console.log('Count:' + $scope.count);
    }
})

.controller('favoritesCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


})

.controller('settingsCtrl', function($scope) {

})
