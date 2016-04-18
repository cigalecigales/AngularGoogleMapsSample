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
                latitude: 35.681382,
                longitude: 139.766084
            },
            zoom: 12,
            options: {
                mapTypeId: google.maps.MapTypeId.HYBRID
            }
        };
    });
}]);
