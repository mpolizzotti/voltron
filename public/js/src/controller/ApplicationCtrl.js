/*jshint nomen:false */
/*global define:true */

define(
	[
		'app',
		'angular',
		'underscore',
		'debug',
		'directive/PreventDefault',
		'filter/Localize'
	],
	function (app, angular, _, debug) {
		'use strict';

		/**
		The Application controller sits at the root of the application.

		@class ApplicationCtrl
		@submodule gallery-controller
		@constructor
		**/
		app.gallery.controller(
			'ApplicationCtrl',
			[
				'$scope',
				'$filter',
				function ($scope, $filter) {}
			]
		);
	}
);