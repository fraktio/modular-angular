define(['../../services/post-service'], function () {
    'use strict';

    angular.module('postList', ['postService'])
        .directive('postList', ['postService', function (postService) {
            return {
                template: require('./template.html'),
                controller: ['$scope', function($scope) {
                    require('./style.less');

                    $scope.posts = [];
                    postService.getAll().then(function (posts) {
                        $scope.posts = posts;
                    });
                }]
            };
        }]);
});
