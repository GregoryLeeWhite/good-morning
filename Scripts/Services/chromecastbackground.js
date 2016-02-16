app.factory('chromecastbackground', ['$http', function($http) {

  function getChromecastBackgrounds() {
    return $http.get('background.json');
  }

  return {
    getChromecastBackgrounds: getChromecastBackgrounds
  }
}]);
