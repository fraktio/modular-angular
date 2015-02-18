define(['../../services/post-service'], function () {
    'use strict';

    angular.module('postEdit', ['ngRoute', 'postService'])
        .directive('postEdit', function () {
            return {
                template: require('./template.html'),
                controller: ['$scope', 'postService', '$routeParams', '$sce',
                    function($scope, postService, $routeParams, $sce) {
                        require('./style.less');

                        $scope.post = null;
                        postService.getBySlug($routeParams.slug).then(function(post) {
                            post.content = $sce.trustAsHtml('<p>' + post.content.replace('\n', '</p><p>') + '</p>');
                            $scope.post = post;
                        });
                    }
                ]
            };
        });
});
