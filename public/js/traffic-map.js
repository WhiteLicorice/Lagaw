function initMap() {
    if (navigator.geolocation) {    //  Check if Geolocation API is available
        //  Declare map and marker
        var userLocation;
        var map;    
        var marker;
        //  User navigator.geolocation.watchPosition() to make marker dynamic -> adjust its position relative to the location of the user
        navigator.geolocation.watchPosition(function(position) {
            //  Read initial coordinates, if null then read user location
            if (!initCoords) {
                userLocation = {    
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                //console.log("No initial coordinates!");
                //console.log(userLocation);
            } else {
                userLocation = initCoords;
                //console.log("Initial coordinates found!");
                //console.log(userLocation);
            }
            
            //  Static case: if map does not exist, create the map
            if (!map) {
                //  Instantiate 'map' as an instance of google.maps, call API constructor
                map = new google.maps.Map(document.getElementById('map'), {
                    center: userLocation,   //  Initial coordinates at the current location of the user
                    zoom: 12,
                    mapTypeControlOptions: {    //  Define the style of the map
                        mapTypeIds: ['roadmap', 'terrain'],
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    }
                });
                map.setMapTypeId('terrain');    //  Terrain map default
                map.addListener('click', function(event) {
                    var destination = {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng()
                      };
                    calculateDistance(map, userLocation, destination);  //  Show distance to destination on-click
                })
                
            }
            //  Static case: if marker does not exist, create a new marker
            if (!marker) {
                //  Call API marker constructor with initial coordinates at the user's current location and place it on 'map'
                marker = new google.maps.Marker({
                    position: userLocation,
                    map: map
                });
            } else {
                marker.setPosition(userLocation);   //  Dynamic case: update the location of the marker as the user's location changes
            }
            var destination = new google.maps.LatLng(37.7749, -122.4194);
        });
    } else {    //  If HTML5 Geolocation API is unavailable, initialize map with default settings
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 10.720321, lng: 122.562019},  //  Default initial coordinates are Iloilo City's
            zoom: 8,
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'terrain'],
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            }
        });
        map.setMapTypeId('terrain');
    }
  }

var prevMarker; //  Declare DOM variables for storing markers and routes for deletion when calculateDistance() is called
var prevRoute;

function calculateDistance(map, origin, destination) {
    // Create a LatLngBounds object to fit the route within the map
    var bounds = new google.maps.LatLngBounds();

    //  Delete previous marker if it exists
    if(prevMarker) {
        prevMarker.setMap(null);
    }
    
    // Create a marker for the destination
    var marker = new google.maps.Marker({
      position: destination,
      map: map
    });

    prevMarker = marker;    //  Store current marker
  
    // Extend the bounds to include the destination marker
    bounds.extend(marker.getPosition());
  
    if (prevRoute) {
        prevRoute.setMap(null);
    }

    // Create a Polyline object to show the route between the user and the destination
    var route = new google.maps.Polyline({
      path: [origin, destination],
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      map: map,
    });

    prevRoute = route;      //  Store current route
  
    // Extend the bounds to include the route polyline
    route.getPath().forEach(function(latLng) {
      bounds.extend(latLng);
    });
  
    // Fit the bounds within the map
    map.fitBounds(bounds);
  
    // Calculate the distance between the user and the destination
    var distance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(origin),
      new google.maps.LatLng(destination)
    );
  
    // Convert the distance to kilometers and round to two decimal places
    var distanceInKm = (distance / 1000).toFixed(2);
  
    // Show the distance in an info window on the destination marker
    var infoWindow = new google.maps.InfoWindow({
      content: 'Distance from current location: ' + distanceInKm + ' km.'
    });
  
    infoWindow.open(map, marker);   //  Open info window containing distance and destination
}

initMap();    //  Manually initialize map