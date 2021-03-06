/*
 * Eventing.js - Service
 * Factory methods for event functionality 
 * Also includes segment functionality
 * dependent on event.js service
 */

'use strict';

angular.module('angularFullApp')
	.factory('Segmenting', function Segmenting($location, $rootScope, Segment) {


		return {

			/**
			 * Create a new Segment
			 *
			 * @param {object} segment - segment info
			 * @param {function} callback - optional
			 * return {Promise}
			 */
			addSegment: function(segment, callback) {
				var cb = callback || angular.noop;

				return Segment.save(segment,
					function(segment) {
						return cb(segment);
					},
					function(err) {
						return cb(err);
					}).$promise;
			},



			/**
			 * Edit Segment
			 *
			 * @param - {String} - newTime
			 * @param - {String} - newDuration
			 * @param - {String} - newCategory
			 * @param - {String} - newTask
			**/
			editSegment: function(id, newTime, newDuration, newCategory, newTask, callback) {
				var cb = callback || angular.noop;

				return Segment.update({
					newId: id,
					newTime: newTime,
					newDuration: newDuration,
					newCategory: newCategory,
					newTask: newTask
				}, function(segment) {
					return cb(segment);
				}, function(err) {
					return cb(err);
				}).$promise;
			},


			deleteSegment: function(id, callback) {
				var cb = callback || angular.noop;

				return Segment.delete({
					segmentId: id,
				}, function(segment) {
					return cb(segment);
				}, function(err) {
					return cb(err);
				}).$promise;
			},

			currentSegment: function() {
				return Segment.get();
			},

		};//return

	});//factory

