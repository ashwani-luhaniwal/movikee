'use strict';

var movieApp = angular.module('MovieApp', []);
movieApp.controller('MovieController', function($scope, $http) {
	var requestInfo;

	if ($scope.search === undefined) {
		$scope.search = 'Captain America: The Winter Soldier';
		fetch();
	}

	$scope.change = function() {
		if (requestInfo) {
			clearTimeout(requestInfo);
		}
		requestInfo = setTimeout(fetch, 800);
	};

	function fetch() {
		$http.get('http://www.omdbapi.com/?t=' + $scope.search + '&tomatoes=true&plot=full')
			.success(function(response) {
				$scope.details = response;
				// alert($scope.details);
			});

		$http.get('http://www.omdbapi.com/?s=' + $scope.search)
			.success(function(response) {
				$scope.related = response;
			});
	}

	$scope.update = function(movie) {
		$scope.search = movie.Title;
		$scope.change();
	};

	$scope.select = function() {
		this.setSelectionRange(0, this.value.length);
	};
});
