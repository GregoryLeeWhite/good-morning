app.factory('greeting', ['$http', 'localStorageService', function($http, localStorageService) {

  function getUsersName(){
    var name = localStorageService.get('userName');
    return name;
  }

  function setUsersName(inputName) {
    var name = localStorageService.set('userName', inputName);
  }

  function resetUsersName() {
    localStorageService.clearAll();
  }

  return {
    getUsersName: getUsersName,
    setUsersName: setUsersName,
    resetUsersName: resetUsersName
  }
}]);
