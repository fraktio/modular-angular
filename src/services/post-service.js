define([], function () {
   'use strict';

    var posts = [
        {slug: 'blah', title: 'Blah'}
    ];

    angular.module('postService', [])
        .service('postService', ['$q', function ($q) {
            this.getAll = function () {
                return $q(function (resolve) {
                    resolve(posts);
                });
            };

            this.getBySlug = function (slug) {
                return $q(function (resolve, reject) {
                    var matchingPosts = posts.filter(function (post) {
                        return post.slug === slug;
                    });

                    if (matchingPosts.length < 1) {
                        reject();
                    }

                    resolve(matchingPosts[0]);
                });
            };
        }]);
});