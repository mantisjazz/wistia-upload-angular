'use strict';

/**
 * @ngdoc overview
 * @name wistiaProjectApp
 * @description
 * # wistiaProjectApp
 *
 * Main module of the application.
 */
angular
	.module('wistiaProjectApp', [
		'ngAnimate',
		'ngCookies',
		'ngMessages',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ui.bootstrap'
	])
	.constant('WISTIA_TOKEN', '')
	.config(function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl',
				controllerAs: 'main'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl',
				controllerAs: 'about'
			})
			.otherwise({
				redirectTo: '/'
			});
	})
	.run(function(WISTIA_TOKEN){
		if(WISTIA_TOKEN === ''){
			alert('WISTIA_TOKEN is empty');
		}
	});
