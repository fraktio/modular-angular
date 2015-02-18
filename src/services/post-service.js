define([], function () {
   'use strict';

    var postsUrl = require('file!./../data/posts.json');

    angular.module('postService', [])
        .service('postService', ['$q', '$http', function ($q, $http) {
            var posts = null;

            this.getAll = function () {
                if (posts) {
                    return $q(function(resolve) {
                        resolve(posts);
                    });
                }

                return $http.get(postsUrl).then(function (response) {
                    posts = response.data;
                    return posts;
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
