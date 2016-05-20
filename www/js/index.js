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
            }
        };

        $scope.markers = [{
            id: 1,
            latitude: 35.681382,
            longitude: 139.766084
        }, {
            id: 2,
            latitude: 35.628856,
            longitude: 139.738854
        }];

        $scope.polyline = {
            id: 1,
            path: [{
                latitude: $scope.markers[0].latitude,
                longitude: $scope.markers[0].longitude
            }, {
                latitude: $scope.markers[1].latitude,
                longitude: $scope.markers[1].longitude
            }],
            stroke: {
                color: '#6060FB',
                weight: 3
            },
            editable: true,
            draggable: true,
            geodesic: true,
            visible: true,
            icons: [{
                icon: {
                    path: google.maps.SymbolPath.CIRCLE
                },
                offset: '25px',
                repeat: '50px'
            }]
        };
    });
}]);
