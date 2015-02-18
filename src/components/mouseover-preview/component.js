define([], function () {
    'use strict';

    angular.module('mouseoverPreview', ['ngRoute', 'postService'])
        .directive('mouseoverPreview', function () {
            return {
                scope: {},
                transclude: true,
                template: require('./template.html'),
                controller: function() {
                    require('./style.less');
                }
            };
        });
});
