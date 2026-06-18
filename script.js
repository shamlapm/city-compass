function getLocation() {

    const output = document.getElementById("location");

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            function(position) {

                output.innerHTML =
                "Latitude: " + position.coords.latitude +
                "<br>Longitude: " + position.coords.longitude;

            },

            function() {

                output.innerHTML =
                "Unable to retrieve location.";

            }

        );

    } else {

        output.innerHTML =
        "Geolocation is not supported.";

    }

}
