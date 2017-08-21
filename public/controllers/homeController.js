/**
 * Created by ChangLiu on 8/4/17.
 */
(function () {
    angular
        .module("tinyurlApp")
        .controller("homeController", homeController);

    function homeController($http, $location) {
        var vm = this;
        vm.submit = submit;

        function submit() {
            $http.post("/api/v1/urls", {
                longUrl : vm.longUrl
            }).success(function (data) {
                $location.path("/urls/" + data.shortUrl);
            });
        }
    }
})();
