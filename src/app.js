define(
    [
        './components/post-edit/component',
        './components/post-list/component'
    ],
    function () {
        'use strict';

        angular
            .module(
                'app',
                [
                    'ngRoute',
                    'postList',
                    'postEdit'
                ]
            )
            .config(['$routeProvider', '$locationProvider',
                function($routeProvider, $locationProvider) {
                    $routeProvider
                        .when('/', {template: '<div post-list></div>'})
                        .when('/:slug', {template: '<div post-edit></div>'})
                        .otherwise({redirectTo: '/'});

                    //$locationProvider.html5Mode(true);
                }
            ]);

        angular.bootstrap(document, ['app']);
    }
);
