var app = ons.bootstrap('AngularGoogleMapsSample', ['onsen', 'uiGmapgoogle-maps']);

app.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        v: '3.22'
    });
}]);

app.controller("TopPageController", ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {
            control: {},
            center: {
                latitude: 35.681382,
                longitude: 139.766084
            },
            zoom: 12,
            options: {
                mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            markers: [{
                id: 1,
                latitude: 35.681382,
                longitude: 139.766084
            }, {
                id: 2,
                latitude: 35.628856,
                longitude: 139.738854
            }]
        };

        // ルート情報の表示サービス
        var directionsDisplay = new google.maps.DirectionsRenderer();
        // ルート検索サービス
        var directionsService = new google.maps.DirectionsService();

        $scope.directions = {
            // FROM
            origin: "Collins St, Melbourne, Australia",
            // TO
            destination: "MCG Melbourne, Australia",
            showList: false
        }

        // ルート取得処理
        $scope.getDirections = function() {
            // ルート検索のモードを取得
            var travelModeList = document.getElementsByName("travelMode");
            var travelMode = "DRIVING";
            for (var i = 0; i < travelModeList.length; i++) {
                if (travelModeList[i].checked) {
                    travelMode = travelModeList[i].value;
                }
            }
            // リクエストを作成
            var request = {
                origin: $scope.directions.origin, // FROM
                destination: $scope.directions.destination, // TO
                travelMode: google.maps.DirectionsTravelMode[travelMode] // モード
            };
            //ルート検索サービスの呼び出し
            directionsService.route(request, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                  // 画面にルート情報を表示
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setMap($scope.map.control.getGMap());
                    directionsDisplay.setPanel(document.getElementById('directionsList'));
                    $scope.directions.showList = true;
                } else {
                    alert('Google route unsuccesfull!');
                }
            });
        }
    });
}]);
