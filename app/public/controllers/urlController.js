/**
 * Created by ChangLiu on 8/4/17.
 */
(function () {
    angular
        .module("tinyurlApp")
        .controller("urlController", urlController);

    function urlController($http, $routeParams) {
        var vm = this;
        vm.init = init;


        init();

        function init() {
            $http.get("/api/v1/urls/" + $routeParams.shortUrl)
                .success(function (data) {
                    vm.longUrl = data.longUrl;
                    vm.shortUrl = data.shortUrl;
                    vm.shortUrltoShow = "http://localhost:3000/" + data.shortUrl;
                });

            $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/totalClicks")
                .success(function (data) {
                    vm.totalClicks = data;
                });

        }
    }


})();

