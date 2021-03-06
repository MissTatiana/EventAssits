/**
 * crew.js - Controller - Front end
 * Specifc to the current event
 * send and recieve crew information of event
 *
 * requires categories
**/

'use strict';

angular.module('angularFullApp')
	.controller('CrewCtrl', function ($http, $scope, $location, Crewing, $routeParams) {

		var currentEvent = $routeParams.id;

		$scope.crew = {};
		$scope.errors = {};

		$scope.addCrew = function(form) {
			$scope.submitted = true;

			if(form.$valid) {
				Crewing.addCrew({
					//need event id
					eventId: currentEvent,
					category: $scope.crew.category,
					crewMember: $scope.crew.crewMember
				}, function(crew) {
					$scope.getCrew.push(crew);
				})
				.catch( function(err) {
					err = err.data;
					$scope.errors = {};

					//update validity of form fields that match the mongoose errors
					angular.forEach(err.errors, function(error, field) {
						form[field].$setValidity('mongoose', false);
						$scope.errors[field] = error.message;
					});
				})
				.then( function() {
					$scope.submitted = false;
					$scope.crew = {};
				});
			}
		};

		//get crew
		$http.get('/api/getCrew/' + currentEvent).success(
			function(getCrew) {
				$scope.getCrew = getCrew;

				$scope.categorySort = 'category';
			});

		//get event's categories for crew
		$http.get('/api/getCategorys').success(function(getCategorys) {
				$scope.getCategorys = getCategorys;
			});

		//get event info for back btn
		$http.get('/api/events/' + currentEvent).success(
			function(showEvent) {
				$scope.showEvent = showEvent.shape;
			});

	});//controller