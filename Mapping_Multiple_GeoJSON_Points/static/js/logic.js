// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map. 
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/jperth1/Mapping_Earthquakes/main/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
      onEachFeature: function(feature, layer) {
          layer.bindPopup("<h2>" + "Airport code:"+ " " + feature.properties.faa + "</h2> <hr> <h3>" + "Airport name:" + " " + feature.properties.name + "</h3>")
      }
  }).addTo(map);
});

//  add a popup marker for each feature using onEachFeature Function.
//L.geoJSON(airportData, {
    //onEachFeature: function(feature, layer) {
        //console.log(layer);
        //layer.bindPopup("<h2>" + "Airport code:"+ " " + feature.properties.faa + "</h2> <hr> <h3>" + "Airport name:" + " " + feature.properties.name + "</h3>");
    //}
//}).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

