function getLocation() {

const output = document.getElementById("location");

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            output.innerHTML =
            "<b>✅ Location Detected Successfully!</b><br><br>" +
            "Latitude: " + lat +
            "<br>" +
            "Longitude: " + lon +
            "<br><br>" +
            "<a target='_blank' href='https://www.google.com/maps?q=" +
            lat + "," + lon +
            "'>📍 Open in Google Maps</a>";

        },

        function(error) {

            output.innerHTML =
            "❌ Location permission denied or unavailable.";

        }

    );

} else {

    output.innerHTML =
    "❌ Geolocation is not supported by this browser.";

}


}
