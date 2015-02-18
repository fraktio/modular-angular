define([], function () {
    'use strict';

    angular.module('author', [])
        .directive('author', function () {
            return {
                scope: {
                    author: '='
                },
                template: require('./template.html'),
                controller: function () {
                    require('./style.less');
                }
            };
        });
});
