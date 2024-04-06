 
 // Store our API endpoint as queryUrl.
let usgsUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
const COLOR_DEPTHS = [-10, 10, 30, 50, 70, 90];

// Creating the map object
let myMap = L.map("map", {
    center:[34.1347, -84.0669],
    zoom:3
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Perform a GET request to the query URL
d3.json(usgsUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data);
});

// Assign popup that describes the place, magnitude, and depth of the earthquake.
function eachFeature(feature, layer) {
    const magnitude = feature.properties.mag;
    const depth = feature.geometry.coordinates[2];
    layer.bindPopup(
        `<h3>${feature.properties.place}</h3>
        <p>Magnitude: ${magnitude}</p>
        <p>Depth: ${depth} km</p>`
    );
}

// Create a function to determine the color of the marker based on the depth
function getColor(depth) {
    let color = "";
    if (depth < COLOR_DEPTHS[0]) {
        color = "#ccffcc";
    }else if (depth < COLOR_DEPTHS[1]) {
        color = "#d9ff66";
    } else if (depth < COLOR_DEPTHS[2]) {
        color = "#ffaa00";
    } else if (depth < COLOR_DEPTHS[3]) {
        color = "#cc8800";
    } else if (depth < COLOR_DEPTHS[4]) {
        color = "#b300b3";
    } else if (depth < COLOR_DEPTHS[5]) {
        color = "#ff3300";
    } else {
        color = "#991f00";
    }
    return color;
}

// Create a function to determine the size of the marker based on the magnitude
function getSize(magnitude) {
    // You can adjust the scaling factor as needed
    return magnitude * 5;
}

// Create features from earthquake data
function createFeatures(earthquakeData) {
    // Create a Leaflet GeoJSON layer and define options for each earthquake feature
    let earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: getSize(feature.properties.mag),
                fillColor: getColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(`<h3>${feature.properties.place}</h3><p>Magnitude: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]} km</p>`);
        }
    }).addTo(myMap);
    
    // Create a legend after adding features to the map
let legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend');
    let labels = [];

    // Loop through depth intervals and generate a label with a colored square for each interval
    for (let i = 0; i < COLOR_DEPTHS.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(COLOR_DEPTHS[i]) + '">&emsp;&emsp;</i> ' +
            COLOR_DEPTHS[i] + (COLOR_DEPTHS[i + 1] ? '&ndash;' + COLOR_DEPTHS[i + 1] + ' km<br>' : '+ km');
    }
    return div;
};

legend.addTo(myMap);