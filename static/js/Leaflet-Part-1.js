 
 // Store our API endpoint as queryUrl.
let usgsUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// Perform a GET request to the query URL/
d3.json(usgsUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
  });
  
  function createFeatures(earthquakeData) {
 
 // Create a function to determine the size of the marker based on the magnitude
 function getSize(magnitude) {
    // You can adjust the scaling factor as needed
    return magnitude * 5;
}

// Create a function to determine the color of the marker based on the depth
function getColor(depth) {
    // You can define the color based on depth
    let scale = ['#FFFF00', '#FFA500', '#FF4500', '#FF0000']; 
    let depthScale = d3.scaleLinear()
                       .domain([0, 700]) 
                       .range([0, scale.length - 1]);
    let index = Math.floor(depthScale(depth));
    return scale[index];
}

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
});

// Add the earthquakes layer to the map
earthquakes.addTo(map);
}

 // Create a legend
 let legend = L.control({ position: 'bottomright' });

 legend.onAdd = function (map) {

     let div = L.DomUtil.create('div', 'info legend');
     let grades = [0, 1, 2, 3, 4];
     let labels = [];

     // Loop through magnitude intervals and generate a label with a colored square for each interval
     for (let i = 0; i < grades.length; i++) {
         div.innerHTML +=
             '<i style="background:' + getColor(grades[i]) + '"></i> ' +
             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
     }

     return div;
 };

 legend.addTo(map);
}