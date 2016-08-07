angular.module('imagefinder.controllers', [])

.controller('SearchCtrl', function($scope, Flickr, $ionicModal, SearchData) {
    $scope.photos = [];
    $scope.currentPhoto = null;
    $scope.prevPhoto = null;
    $scope.nextPhoto = null;
    $scope.currentPhotoSrc = '';
    $scope.SearchData = SearchData;

    $scope.search = function(search) {
        if (window.cordova && window.cordova.plugins.Keyboard) {
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
                SearchData.count = 0;
                $scope.setCurrentPhoto(SearchData.count);
            } else {
                SearchData.count = null;
                $scope.currentPhoto = null;
                $scope.currentPhotoSrc = "img/sad_no_results.png";
            }
        }, function(err) {
            console.log('Failed: ' + err);
            $scope.loading = false;
        });
    }

    $scope.next = function() {
        if ($scope.photos.length > 0) {
            SearchData.count += 1;
            $scope.setCurrentPhoto(SearchData.count);

            console.log('Next Count:' + SearchData.count);

            // Reset if hit last photo
            if (SearchData.count == $scope.photos.length) {
                SearchData.count = 0;
            }
        }
    }

    $scope.prev = function() {
        if (SearchData.count > 0) {
            SearchData.count -= 1;
            $scope.setCurrentPhoto(SearchData.count);
        }
        console.log('Prev Count:' + SearchData.count);
    }

    $scope.random = function() {
        if ($scope.photos.length > 0) {
            SearchData.count = Math.floor((Math.random() * ($scope.photos.length - 1)));
            $scope.setCurrentPhoto(SearchData.count);
            console.log('Count:' + SearchData.count);
        }
    }

    $scope.setCurrentPhoto = function(count) {
        $scope.currentPhoto = $scope.photos[count];
        $scope.currentPhotoSrc = $scope.getCurrentPhotoSrc();
    }

    $scope.getCurrentPhotoSrc = function() {
        return 'http://farm' + $scope.currentPhoto.farm + '.static.flickr.com/' + $scope.currentPhoto.server + '/' + $scope.currentPhoto.id + '_' + $scope.currentPhoto.secret + '_z.jpg';
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

.controller('MenuCtrl', function($scope, $location, $ionicPopover) {
    
    $scope.dummyShow = function(num) {
        console.log("BUTTON CLICKED:" + num);
    }

    $ionicPopover.fromTemplateUrl('templates/menu.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.showMenu = function($event) {
        $scope.popover.show($event);
    }

    $scope.closePopover = function() {
        $scope.popover.hide();
    };

    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });

    // Execute action on hide popover
    $scope.$on('popover.hidden', function() {
        // Execute action
    });

    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
        // Execute action
    });

})

.controller('DownloadCtrl', function($scope, $http, $cordovaFileTransfer, $ionicPopup, SearchData) {

    $scope.SearchData = SearchData;

    $scope.Download = function() {

        $scope.popover.hide();

        // File name only
        var filename = $scope.currentPhotoSrc.split("/").pop();
        var targetPath;

        // Save location
        if (/(android)/i.test(navigator.userAgent)) {
            targetPath = cordova.file.externalRootDirectory + filename;
        } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            targetPath = cordova.file.dataDirectory + filename;
        } else {
            targetPath = cordova.file.dataDirectory + filename;

        }

// targetPath = cordova.file.dataDirectory + filename;

        $cordovaFileTransfer.download($scope.currentPhotoSrc, targetPath, {}, true).then(function(result) {
            console.log('Success');
            $scope.showDownloadedAlert();
            // alert('Download Success');
            refreshMedia.refresh(targetPath);
        }, function(error) {
            console.log('Error');
        }, function(progress) {
            // PROGRESS HANDLING GOES HERE
        });

    }

    $scope.showDownloadedAlert = function() {
        $scope.popover.hide();
        var alertPopup = $ionicPopup.alert({
            title: '',
            template: 'Picture Saved'
        });

        alertPopup.then(function(res) {
            console.log('Picture Saved.');
            // Custom functionality....
        });

    }

    $scope.showAboutAlert = function() {

        $scope.popover.hide();
        var alertPopup = $ionicPopup.alert({
            title: 'About',
            template: 'Random Image Finder Version 1.1'
        });

        alertPopup.then(function(res) {
            console.log('View About.');
            // Custom functionality....
        });
    };

});
