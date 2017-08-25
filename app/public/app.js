/**
 * Created by ChangLiu on 8/4/17.
 */
var app = angular.module('tinyurlApp', ['ngRoute', 'ngResource', 'chart.js']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/public/views/home.html",
            controller: "homeController",
            controllerAs: "model"
        })
        .when("/urls/:shortUrl", {
            templateUrl: "/public/views/url.html",
            controller: "urlController",
            controllerAs: "model"
        });
});