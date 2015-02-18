define(['../../services/post-service'], function () {
    'use strict';

    angular.module('postList', ['postService'])

        .filter('reverseName', function() {
            return function(value) {
                var parts = value.split(' ');
                parts.unshift(parts.pop());
                return parts.join(' ');
            };
        })

        .directive('postList', ['postService', function (postService) {
            return {
                template: require('./template.html'),
                controller: ['$scope', function($scope) {
                    require('./style.less');

                    $scope.posts = [];
                    postService.getAll().then(function (posts) {
                        $scope.posts = posts;
                    });

                    $scope.refreshPosts = function() {
                        postService.getAll().then(function (posts) {
                            $scope.posts = posts;
                        });
                    };

                    $scope.touchPostProperty = function(prop) {
                        $scope.posts = $scope.posts.map(function(post) {
                            post[prop] += ' test';
                            return post;
                        })
                    };
                }]
            };
        }]);
});
