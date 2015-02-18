define([], function () {
   'use strict';

    var postsUrl = require('file!./../data/posts.json');

    angular.module('postService', [])
        .service('postService', ['$http', function ($http) {
            this.getAll = function () {
                return $http.get(postsUrl).then(function(response) {
                    return response.data;
                });
            };

            this.getBySlug = function (slug) {
                return this.getAll().then(function (posts) {
                    var matchingPosts = posts.filter(function (post) {
                        return post.slug === slug;
                    });

                    if (matchingPosts.length < 1) {
                        throw new Error('No matching post');
                    }

                    return matchingPosts[0];
                });
            };
        }]);
});
