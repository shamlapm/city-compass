function getLocation() {

    const output = document.getElementById("location");

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            function(position) {

                output.innerHTML =
                "<b>Location Detected Successfully!</b><br><br>" +
                "Latitude: " + position.coords.latitude +
                "<br>" +
                "Longitude: " + position.coords.longitude;

            },

            function(error) {

                output.innerHTML =
                "Location permission denied or unavailable.";

            }

        );

    } else {

        output.innerHTML =
        "Geolocation is not supported by this browser.";

    }
}
