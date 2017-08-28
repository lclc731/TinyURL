/**
 * Created by ChangLiu on 8/4/17.
 */
(function () {
    angular
        .module("tinyurlApp")
        .controller("urlController", urlController);

    function urlController($http, $routeParams, $scope) {
        var vm = this;
        vm.init = init;
        vm.renderChart = renderChart;
        vm.getTime = getTime;
        vm.hour = "hour";
        vm.day = "day";
        vm.month = "month";
        vm.time = vm.hour;

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
            
            renderChart("doughnut", "referer");
            renderChart("pie", "country");
            renderChart("base", "platform");
            renderChart("bar", "browser");

            getTime()
        }

        function renderChart(chart, infos) {
            $scope[chart + "Labels"] = [];
            $scope[chart + "Data"] = [];

            $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/" + infos)
                .success(function (data) {
                    data.forEach(function (info) {
                        $scope[chart + "Labels"].push(info._id);
                        $scope[chart + "Data"].push(info.count);
                    });
                });
        }

        function getTime(time) {
            $scope.lineLabels = [];
            $scope.lineData = [];
            vm.time = time;

            $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/" + time)
                .success(function (data) {
                    data.forEach(function (item) {
                        var legend = "";
                        if (time === "hour") {
                            if (item._id.minutes < 10) {
                                item._id.minutes = "0" + item._id.minutes;
                            }
                            legend = item._id.hour + ":" + item._id.minutes;
                        }
                        if (time === "day") {
                            legend = item._id.hour + ":00";
                        }
                        if (time === "month") {
                            legend = item._id.month + "/" + item._id.day;
                        }
                        $scope.lineLabels.push(legend);
                        $scope.lineData.push(item.count);
                    });
                });
        }
    }


})();

