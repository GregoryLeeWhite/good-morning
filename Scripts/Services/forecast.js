//API Key 365a071daa25762c
app.factory('forecast', ['$http', 'geolookup', '$q', function($http, geolookup, $q) {

  function getForecast(state, city) {

    return $http.get('https://api.wunderground.com/api/365a071daa25762c/forecast/q/' + state + '/' + city + '.json');
  }

  return {
    getForecast: getForecast
  }
}]);
