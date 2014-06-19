'use strict';

/**
 * createEvent.js 
 * creates the events
**/

angular.module('angularFullApp')
	.controller('CreateEventCtrl', function ($scope, Eventing, $location) {
			
		$scope.event = {};
		$scope.errors = {};

		/* 6/12 1:13am I have a new error, unknown provider */

		$scope.createEvent = function(form) {
			$scope.submitted = true;

			if(form.$valid) {
				Eventing.createEvent({
					title: $scope.event.title,
					date: $scope.event.date,
					setUp: $scope.event.setUp,
					startTime: $scope.event.startTime,
					strike: $scope.event.strike,
					description: $scope.event.description
				})
				.then( function() {
					//Event created, redirect them to event page
					$location.path('/event');
				})
				.catch( function(err) {
					err = err.data;
					$scope.error = {};

					//update validity of form fields that match the mongoose errors
					angular.forEach(err.errors, function(error, field) {
						form[field].$setValidity('mongoose', false);
						$scope.errors[field] = error.message;
					});
				});
			}
		};//createEvent



	});//controller