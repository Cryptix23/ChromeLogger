var app = angular.module('app', ['truncate']);

function OptionsCtrl($scope, $route) {

  chrome.storage.local.getBytesInUse(function(x) {
    $scope.usageMB = (x / 1048576 + '').substring(0, 5);
    $scope.$apply();
  });

  // Page load functions
  chrome.storage.sync.get(function(results) {
  	console.log(results);
  	$scope.saveType = results.saveType;
  	$scope.saveAll = results.saveAll;
  	$scope.$apply();
  });

  $scope.save = function() { // Handle option changes
		console.log($scope.saveType, $scope.saveAll);
		chrome.storage.sync.set({saveType: $scope.saveType, saveAll: $scope.saveAll}, saved);
	}

	$scope.clear = function() {
    var clearLimit = new Date(Date.now() - (86400000 * $scope.daysToClear)).getTime();
    chrome.storage.local.get(function(x) {
      var trash = []; // Create array of keys to delete
      for (var key in x) {
        if (key < clearLimit) { 
          trash.push(key);
        }
      }
      chrome.storage.local.remove(trash, function() {
      	$route.reload();
      });
    });

	}
}

function saved() {
	console.log('saved');
	//Some alert message 
}