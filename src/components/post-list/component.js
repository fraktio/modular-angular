define(['../../services/post-service', '../mouseover-preview/component', '../author/component'], function () {
    'use strict';

    angular.module('postList', ['postService', 'mouseoverPreview', 'author'])

        .filter('reverseName', function() {
            return function(value) {
                var parts = value.split(' ');
                parts.unshift(parts.pop());
                return parts.join(' ');
            };
        })

        .directive('postList', ['postService', function (postService) {

            var getPostsForList = function () {
                return postService.getAll()
                    .then(function(posts) {
                        return posts.map(function(post) {
                            var listPost = _.pick(post, 'slug', 'title');
                            listPost.author = _.pick(post.author, 'name', 'email', 'picture');
                            return listPost;
                        });
                    });
            };

            return {
                scope: {},
                template: require('./template.html'),
                controller: ['$scope', function($scope) {
                    require('./style.less');

                    $scope.posts = [];
                    getPostsForList().then(function (posts) {
                        $scope.posts = posts;
                    });

                    $scope.refreshPosts = function() {
                        getPostsForList().then(function (posts) {
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
