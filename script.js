function getLocation(){

navigator.geolocation.getCurrentPosition(

function(position){

document.getElementById("location").innerHTML =
"Latitude: " + position.coords.latitude +
"<br>Longitude: " + position.coords.longitude;

}

);

}
