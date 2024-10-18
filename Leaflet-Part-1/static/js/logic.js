
var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 4,
}).addTo(map);

function getRadius(magnitude) {
    return magnitude * 4;  // Adjust the factor as needed
}

// Define a function to determine the circle color based on earthquake depth
function getColor(depth) {
    return depth > 300 ? '#bd0026' :  // Deep earthquakes - dark red
           depth > 100 ? '#fecc5c' :  // Moderate depth - yellow-orange
                         '#ffffb2';   // Shallow earthquakes - pale yellow
}

const geoJsonLayer = L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        const magnitude = feature.properties.mag;
        const depth = feature.geometry.coordinates[2];

        return L.circleMarker(latlng, {
            radius: getRadius(magnitude),  // Circle size based on magnitude
            fillColor: getColor(depth),    // Circle color based on depth
            color: '#000',                 // Border color
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`<strong>Magnitude: ${feature.properties.mag}</strong><br>${feature.properties.place}<br>Depth: ${feature.geometry.coordinates[2]} km`);
    }
});

// Add the GeoJSON layer to the map
geoJsonLayer.addTo(map);

// Automatically adjust map bounds to show all features
map.fitBounds(geoJsonLayer.getBounds());