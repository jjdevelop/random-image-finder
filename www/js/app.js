// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('imagefinder', ['ionic', 'imagefinder.controllers', 'imagefinder.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

      var admobid = {};
        // select the right Ad Id according to platform
        if( /(android)/i.test(navigator.userAgent) ) { 
            admobid = { // for Android
                banner: 'ca-app-pub-4258706668546151/3211364822',
                interstitial: 'ca-app-pub-6869992474017983/1657046752'
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            admobid = { // for iOS
                banner: 'ca-app-pub-4258706668546151/3203240824',
                interstitial: 'ca-app-pub-6869992474017983/7563979554'
            };
        } else {
            admobid = { // for Windows Phone
                banner: 'ca-app-pub-6869992474017983/8878394753',
                interstitial: 'ca-app-pub-6869992474017983/1355127956'
            };
        }
 
  if(window.AdMob) AdMob.createBanner( {
      adId:admobid.banner, 
      position:AdMob.AD_POSITION.BOTTOM_CENTER, 
      isTesting: true,
      autoShow:true} );


  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  // Centering Title
  $ionicConfigProvider.navBar.alignTitle('center');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('search', {
    url: '/search',
    templateUrl: 'templates/tab-search.html',
    controller: 'SearchCtrl'
  })

  // // setup an abstract state for the tabs directive
  //   .state('tab', {
  //   url: '/tab',
  //   abstract: true,
  //   templateUrl: 'templates/tabs.html'
  // })

  // // Each tab has its own nav history stack:

  // .state('tab.search', {
  //   url: '/search',
  //   views: {
  //     'tab-search': {
  //       templateUrl: 'templates/tab-search.html',
  //       controller: 'SearchCtrl'
  //     }
  //   }
  // })

  // .state('tab.favorites', {
  //     url: '/favorites',
  //     views: {
  //       'tab-favorites': {
  //         templateUrl: 'templates/tab-favorites.html',
  //         controller: 'favoritesCtrl'
  //       }
  //     }
  //   })

  // .state('tab.settings', {
  //   url: '/settings',
  //   views: {
  //     'tab-settings': {
  //       templateUrl: 'templates/tab-settings.html',
  //       controller: 'settingsCtrl'
  //     }
  //   }
  // })


  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/search');
  $urlRouterProvider.otherwise('/search');

  $ionicConfigProvider.tabs.position('top');

});

