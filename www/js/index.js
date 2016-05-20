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
                latitude: 35.681298,
                longitude: 139.766247
            },
            zoom: 12,
            options: {
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        };

        // ウィンドウ表示するかどうかフラグ
        $scope.windowOptions = {
            visible: false
        };

        // マーカークリック時のイベント
        $scope.onClick = function(marker, eventName, model) {
            $scope.windowOptions.visible = true;
            $scope.selectedItem = model;
            $scope.rating = {
                number: 10
            };
        };

        // ウィンドウクローズ時のイベント
        $scope.closeWindow = function() {
            $scope.windowOptions.visible = false;
        };

        // その他のマーカー
        $scope.markers = [{
            latitude: 35.681298,
            longitude: 139.766247,
            show: false,
            id: 0
        }];
        // ルート検索後用のマーカー
        $scope.route_markers = [];

        // ルート情報の表示サービス
        var directionsDisplay = new google.maps.DirectionsRenderer();
        // ルート検索サービス
        var directionsService = new google.maps.DirectionsService();

        // FROMとTO
        $scope.directions = {
            // FROM
            origin: "Shinbashi station",
            // TO
            destination: "Shinjuku station",
            showList: false
        }

        // ルート取得処理
        $scope.getDirections = function() {
            // リクエストを作成
            var request = {
                origin: $scope.directions.origin, // FROM
                destination: $scope.directions.destination, // TO
                travelMode: google.maps.DirectionsTravelMode["DRIVING"] // モード
            };
            //ルート検索サービスの呼び出し
            directionsService.route(request, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {

                    // 画面にルート情報を表示
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setMap($scope.map.control.getGMap());
                    //getStartAndEndPoint(data);
                    directionsDisplay.setOptions({
                        suppressMarkers: true
                    });
                    getStartAndEndPoint(response);
                    directionsDisplay.setPanel(document.getElementById('directionsList'));
                    $scope.directions.showList = true;
                } else {
                    alert('Google route unsuccesfull!');
                }
            });
        };

        // マップ上に出発点と到着点のマーカーを追加する
        function getStartAndEndPoint(data) {
          // JSONデータから出発点と到着点を取得
          var origin = data.routes[0].legs[0].start_location;
          var destination = data.routes[0].legs[0].end_location;

          var start = {
            lat: origin.lat(),
            lng: origin.lng()
          };
          var stop = {
            lat: destination.lat(),
            lng: destination.lng()
          }

          createMarker(start, stop);
        };

        // マーカーを作成する
        function createMarker(start, stop) {
          $scope.route_markers.push({
              latitude: start.lat,
              longitude: start.lng,
              show: false,
              id: 1
          },{
            latitude: stop.lat,
            longitude: stop.lng,
            show: false,
            id: 2,
            icon: "img/map_icon.png"
          });
        };
    });
}]);

app.directive('customer', function() {
    return {
        restrict: "AE", // ディレクティブの設定先
        replace: true, // 現在の要素をテンプレートで置き換えるかどうか
        scope: { // ディレクティブに適用するスコープ
            // '='は双方向バインディング, '&'は関数, '@'は親スコープからローカルスコープへ単方向バインディング
            number: "@"
        },
        template: function() {
            return '<div class="info_window"> Taro Yamada' + '<a class="start_visit" href="http://google.com"> OK </a>' + '</div>';
        }
    };
});
