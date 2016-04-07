angular
  .module('ForecastApp')
  .controller('Main', Main);

Main.$inject = ['forecast', '$timeout', 'chromecastbackground', 'geolookup', '$q', 'greeting'];

function Main(forecast, $timeout, chromecastbackground, geolookup, $q, greeting) {
  var vm = this;

  /*vm.fiveDay = {};*/
  vm.randomImage = '';
  vm.clock = "";
  vm.tickInterval = 1000 //ms

  vm.getDisplayLocalUserName = function() {
    var localUser = greeting.getUsersName();

    if (localUser) {
      vm.usersName = localUser.name;
    }
  };

  vm.decideGreeting = function() {
    var clockGreeting = new Date().getHours();
    if (clockGreeting >= 1 && clockGreeting <= 11) {
      vm.greeting = "Good morning, ";
    }
    if (clockGreeting >= 12 && clockGreeting <= 17) {
      vm.greeting = "Good afternoon, ";
    }
    if (clockGreeting >= 18 && clockGreeting <= 24) {
      vm.greeting = "Good evening, ";
    }
  };

  var tick = function() {
    vm.clock = Date.now() // get the current time
    vm.decideGreeting();
    $timeout(tick, vm.tickInterval); // reset the timer
  };

  activate();

  function activate() {

    vm.getDisplayLocalUserName();

    vm.decideGreeting();

    geolookup.getGeoLocation().then(function(data) {
      vm.userLocation = data;
      forecast.getForecast(data.location.state, data.location.city).then(function(result) {
        vm.fiveDay = result.data;
      });
    });

    chromecastbackground.getChromecastBackgrounds().then(function(result) {
      vm.image = result.data;
      vm.randomImage = vm.image.items[Math.floor(Math.random() * vm.image.items.length)]; //So clean lul
    });

    vm.update = function() {
      greeting.setUsersName(vm.user);
      vm.getDisplayLocalUserName();
    }

    // Start the timer
    $timeout(tick, vm.tickInterval);
  }
}
