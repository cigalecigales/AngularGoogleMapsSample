var app = ons.bootstrap('AngularGoogleMapsSample', ['onsen', 'uiGmapgoogle-maps']);

app.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        v: '3.22'
    });
}]);

app.controller("TopPageController", ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
    uiGmapGoogleMapApi.then(function(maps) {
        $scope.position = getCurrentPosition();

        $scope.map = {
            control: {},
            center: {
                latitude: 34.985849,
                longitude: 135.7587667
            },
            zoom: 12,
            options: {
                mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            markers: []
        };

        // 現在の位置情報取得処理
        function getCurrentPosition() {
            if (navigator.geolocation) {
                var options = {
                    // 位置情報をキャッシュする時間をミリ秒で指定
                    maximumAge: 3000,
                    timeout: 5000,
                    // GPSを使ってより詳細な位置情報を取得するというオプション設定。これ付けないと動かない
                    enableHighAccuracy: true
                };
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
            } else {
                alert("YOU CAN'T USE Geolocation.");
            }

            // 成功時
            function successCallback(position) {
              var latitude = position.coords.latitude;
              var longitude = position.coords.longitude;
                $scope.map.markers.push({
                    id: 0,
                    latitude: latitude,
                    longitude: longitude
                });
            }

            // 失敗時
            function errorCallback(error) {
                switch (error.code) {
                    case 1:
                        alert("NOT ALLOWED TO GET YOUR POSITION.");
                        break;
                    case 2:
                        alert("FAILED TO GET YOUR CURRENT POSITION.");
                        break;
                    case 3:
                        alert("TIMEOUT.");
                        break;
                }
            }
        };
    });
}]);
