angular.module('imagefinder.controllers', [])

.controller('SearchCtrl', function($scope, Flickr, $ionicModal) {
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
              $scope.setCurrentPhoto($scope.count);
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
        $scope.setCurrentPhoto($scope.count);

        console.log('Next Count:' + $scope.count);

        // Reset if hit last photo
        if ($scope.count == $scope.photos.length) {
          $scope.count = 0;
        }
      }
    }

    $scope.prev = function(){
      if ($scope.count > 0) {
        $scope.count -= 1;
        $scope.setCurrentPhoto($scope.count);
      }
      console.log('Prev Count:' + $scope.count);
    }

    $scope.random = function(){
      if ($scope.photos.length > 0) {
        $scope.count = Math.floor((Math.random() * ($scope.photos.length - 1)));
        $scope.setCurrentPhoto($scope.count);
        console.log('Count:' + $scope.count);
      }
    }

    $scope.setCurrentPhoto = function(count){
      $scope.currentPhoto = $scope.photos[count];
      $scope.currentPhotoSrc = $scope.getCurrentPhotoSrc();
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

    $ionicModal.fromTemplateUrl('templates/image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    $scope.showImage = function() {
      $scope.imageSrc = $scope.getCurrentPhotoSrc();
      $scope.openModal();
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