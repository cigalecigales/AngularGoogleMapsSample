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

        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        var geocoder = new google.maps.Geocoder();

        $scope.directions = {
            origin: "Collins St, Melbourne, Australia",
            destination: "MCG Melbourne, Australia",
            showList: false
        }

        $scope.getDirections = function() {
            var travelModeList = document.getElementsByName("travelMode");
            var travelMode = "DRIVING";
            for (var i = 0; i < travelModeList.length; i++) {
                if (travelModeList[i].checked) {
                    travelMode = travelModeList[i].value;
                }
            }

            var request = {
                origin: $scope.directions.origin,
                destination: $scope.directions.destination,
                travelMode: google.maps.DirectionsTravelMode[travelMode]
            };
            directionsService.route(request, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
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
