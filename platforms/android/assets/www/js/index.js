var app = ons.bootstrap('AngularGoogleMapsSample', ['onsen', 'uiGmapgoogle-maps']);

app.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        v: '3.22'
    });
}]);

app.controller("TopPageController", ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
    uiGmapGoogleMapApi.then(function(maps) {

        $scope.map = {
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
            $scope.selectedHotel = model;
            $scope.rating = {
                number: 10
            };
        };

        // ウィンドウクローズ時のイベント
        $scope.closeWindow = function() {
            $scope.windowOptions.visible = false;
        };

        $scope.markers = [{
            latitude: 35.681298,
            longitude: 139.766247,
            show: false,
            id: 0
        }];
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
