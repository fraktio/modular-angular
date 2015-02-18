define(['../../services/post-service'], function () {
    'use strict';

    angular.module('postEdit', ['ngRoute', 'postService'])
        .directive('postEdit', function () {
            return {
                template: require('./template.html'),
                controller: ['$scope', 'postService', '$routeParams',
                    function($scope, postService, $routeParams) {
                        require('./style.less');

                        $scope.post = null;
                        postService.getBySlug($routeParams.slug).then(function(post) {
                            $scope.post = post;
                        });
                    }
                ]
            };
        });
});
