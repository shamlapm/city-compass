function getLocation() {

const output = document.getElementById("location");

output.innerHTML = "⏳ Getting your location...";

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            output.innerHTML =
            "<b> Location Detected Successfully!</b><br><br>" +
            " Latitude: " + lat + "<br>" +
            " Longitude: " + lon + "<br>" +
            " Accuracy: " + accuracy + " meters<br><br>" +
            "<a target='_blank' href='https://www.google.com/maps?q=" +
            lat + "," + lon +
            "'>Open Location in Google Maps</a>";

        },

        function(error) {

            output.innerHTML =
            "<b> Unable to retrieve location.</b><br><br>" +
            "This deployment is running on HTTP. Modern browsers require HTTPS for geolocation access.";

        }

    );

} else {

    output.innerHTML =
    " Geolocation is not supported by this browser.";

}


}
