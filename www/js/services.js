angular.module('imagefinder.services', ['ionic'])

.factory('Flickr', function($q, $http) {
  var api_key = "9c413dc5d8659716dd7a3385b821a464";
  var shared_key = '9fe62b0f57a487c4';
  var base_url= "https://api.flickr.com/services/rest/";
  var perPage =  150;

  return {
    search: function(search) {
      var deferred = $q.defer();

      var params = {
          api_key: api_key,
          per_page: perPage,
          format: 'json',
          nojsoncallback: 1,
          method: 'flickr.photos.search'
      };

      params.text = search;

      $http({method: 'GET', url: base_url, params: params}).
          success(function(data, status, headers, config) {
               deferred.resolve(data);
          }).
          error(function(data, status, headers, config) {
              deferred.reject(status);
           });

      return deferred.promise;
    }
  };
});
