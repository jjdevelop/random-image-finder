angular.module('imagefinder.controllers', [])

.controller('SearchCtrl', function($scope, Flickr) {
	  $scope.photos = [];
    $scope.currentPhoto = null;
    $scope.prevPhoto = null;
    $scope.nextPhoto = null;
    $scope.currentPhotoSrc = '';
    $scope.count = null;

    $scope.search = function(search){
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.close();
        }
        
        $scope.loading = true;
        var promise = Flickr.search(search);
        promise.then(function(data) {
            // $scope.photos = data.photos;
            $scope.photos = data.photos.photo;
            // $scope.page = data.photos.page;
            // $scope.pages = data.photos.pages;
            // $scope.total = data.photos.total;
            $scope.loading = false;

            if ($scope.photos.length > 0) {
              $scope.count = 0;
              $scope.currentPhoto = data.photos.photo[$scope.count];
              $scope.currentPhotoSrc = $scope.getCurrentPhotoSrc();
            } else {
              $scope.count = null;
              $scope.currentPhoto = null;
              $scope.currentPhotoSrc = "img/sad_no_results.png";
            }
        }, function(err) {
            console.log('Failed: ' + err);
            $scope.loading = false;
        });
    }

    $scope.next = function(){
      if ($scope.photos.length > 0) {
        $scope.count += 1;
        $scope.currentPhoto = $scope.photos[$scope.count];
        $scope.currentPhotoSrc = $scope.getCurrentPhotoSrc();
        console.log('Count:' + $scope.count);
      }
    }

    $scope.prev = function(){
      if ($scope.count > 0) {
        $scope.count -= 1;
        $scope.currentPhoto = $scope.photos[$scope.count];
        $scope.currentPhotoSrc = $scope.getCurrentPhotoSrc();
      }
      console.log('Count:' + $scope.count);
    }

    $scope.getCurrentPhotoSrc = function() {
      return 'http://farm' 
              + $scope.currentPhoto.farm 
              + '.static.flickr.com/' 
              + $scope.currentPhoto.server 
              + '/' 
              + $scope.currentPhoto.id 
              + '_'
              + $scope.currentPhoto.secret
              + '_z.jpg';
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