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
            origin: "東京駅",
            // TO
            destination: "新宿駅",
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
                    directionsDisplay.setDirections(deleteJapanString(response)); // 文字削除したデータをセット
                    directionsDisplay.setMap($scope.map.control.getGMap());
                    directionsDisplay.setPanel(document.getElementById('directionsList'));
                    $scope.directions.showList = true;
                } else {
                    alert('Google route unsuccesfull!');
                }
            });
        };

        // JSONから「日本, 」という文字を削除する処理
        function deleteJapanString(data) {
          // 該当部分の文字列取得
          var origin = data.routes[0].legs[0].start_address;
          var destination = data.routes[0].legs[0].end_address;
          // 削除したい文字列
          var delete_target = "日本, ";

          // 削除したい文字列があるかどうかチェック
          var origin_index = origin.indexOf(delete_target);
          var dest_index = destination.indexOf(delete_target);

          // 該当文字列がある場合は削除する
          if (origin_index >= 0) {
            data.routes[0].legs[0].start_address = origin.slice(origin_index + delete_target.length);
          }
          if (dest_index >= 0) {
            data.routes[0].legs[0].end_address = destination.slice(origin_index + delete_target.length);
          }

          return data;
        }
    });
}]);
