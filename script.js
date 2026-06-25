let map;
let userMarker;
let selectedLocation = null;
let placeMarkers = [];

function initMap() {

    map = L.map("map").setView([20.5937, 78.9629], 5);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "© OpenStreetMap contributors"
        }
    ).addTo(map);

    map.on("click", function (e) {

        selectedLocation = e.latlng;

        if (userMarker) {
            map.removeLayer(userMarker);
        }

        userMarker = L.marker(selectedLocation)
            .addTo(map)
            .bindPopup("Selected Location")
            .openPopup();

        document.getElementById("status").innerHTML =
            "<b>Selected Location</b><br>" +
            "Latitude : " + selectedLocation.lat.toFixed(6) +
            "<br>Longitude : " +
            selectedLocation.lng.toFixed(6);

    });

}

window.onload = initMap;

function findMyLocation() {

    if (!navigator.geolocation) {

        document.getElementById("status").innerHTML =
            "Geolocation not supported.";

        return;

    }

    navigator.geolocation.getCurrentPosition(

        function(position){

            selectedLocation = {

                lat: position.coords.latitude,
                lng: position.coords.longitude

            };

            map.setView(
                [selectedLocation.lat, selectedLocation.lng],
                15
            );

            if(userMarker){
                map.removeLayer(userMarker);
            }

            userMarker = L.marker(
                [selectedLocation.lat, selectedLocation.lng]
            )
            .addTo(map)
            .bindPopup("Your Location")
            .openPopup();

            document.getElementById("status").innerHTML =
                "<b>Location Found</b><br>" +
                "Latitude : " +
                selectedLocation.lat.toFixed(6) +
                "<br>Longitude : " +
                selectedLocation.lng.toFixed(6);

        },

        function(){

            document.getElementById("status").innerHTML =
                "<b>Location access denied.</b><br>" +
                "Click anywhere on the map to choose a location.";

        }

    );

}

function clearMarkers(){

    placeMarkers.forEach(marker=>{

        map.removeLayer(marker);

    });

    placeMarkers=[];

}

async function searchNearby(category){

    if(!selectedLocation){

        alert("Please click 'Find My Location' or select a location on the map.");

        return;

    }

    clearMarkers();

    document.getElementById("place-info").innerHTML="Searching nearby "+category+"...";
    
    let geoCategory = "";

    switch(category){

        case "restaurant":
            geoCategory = "catering.restaurant";
            break;

        case "hospital":
            geoCategory = "healthcare.hospital";
            break;

        case "cafe":
            geoCategory = "catering.cafe";
            break;

        case "atm":
            geoCategory = "service.financial.atm";
            break;

        case "park":
            geoCategory = "leisure.park";
            break;

}
    
    const url=

    "https://api.geoapify.com/v2/places?" +

    "categories=" + geoCategory +

    "&filter=circle:" +

    selectedLocation.lng + "," +

    selectedLocation.lat +

    ",3000" +

    "&bias=proximity:" +

    selectedLocation.lng + "," +

    selectedLocation.lat +

    "&limit=20" +

    "&apiKey=9b96843c9d044185bfc6634760f798d5";

    try{

        const response=await fetch(url);

        const data=await response.json();

        console.log(data);

        showPlaces(data.features,category);

    }

    catch(error){

        console.error(error);

        document.getElementById("place-info").innerHTML=

        "<b>Unable to connect to Geoapify.</b>";

    }

}

function showPlaces(features, category){

    const info = document.getElementById("place-info");

    info.innerHTML = "<h3>Nearby " + category + "</h3>";

    if(!features || features.length === 0){

        info.innerHTML = "<b>No nearby " + category + " found.</b>";

        return;

    }

    features.forEach(place=>{

        const lat = place.geometry.coordinates[1];
        const lon = place.geometry.coordinates[0];

        const name =
            place.properties.name ||
            place.properties.address_line1 ||
            "Unnamed Place";

        const address =
            place.properties.formatted ||
            place.properties.address_line1 ||
            "Address not available";

        const marker = L.marker([lat, lon])
            .addTo(map)
            .bindPopup("<b>" + name + "</b><br>" + address);

        placeMarkers.push(marker);

        marker.on("click", function(){

            info.innerHTML =
                "<h3>" + name + "</h3>" +
                "<p><b>Category:</b> " + category + "</p>" +
                "<p><b>Address:</b><br>" + address + "</p>" +
                "<p><b>Latitude:</b> " + lat.toFixed(6) + "</p>" +
                "<p><b>Longitude:</b> " + lon.toFixed(6) + "</p>";

            marker.openPopup();

        });

    });

    if(placeMarkers.length > 0){

        const group = L.featureGroup(placeMarkers);

        map.fitBounds(group.getBounds().pad(0.2));

    }

}
