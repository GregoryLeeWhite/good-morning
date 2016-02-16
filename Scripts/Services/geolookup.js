app.factory('geolookup', ['$http', function($http) {

  function getGeoLocation(){
    return $http.get('https://api.wunderground.com/api/365a071daa25762c/geolookup/q/autoip.json')
      .then(function(result) {
        return result.data;
      })
      .catch(function(err) {
        return err;
      });
  }

  return {
    getGeoLocation: getGeoLocation
  }
}]);
