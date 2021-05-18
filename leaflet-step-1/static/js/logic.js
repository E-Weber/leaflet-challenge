// query URL
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
console.log(queryUrl);

// get request to query URL
d3.json(queryUrl).then(function (data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // give each feature a popup
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    function pointFunction(feature, layer) {
        return L.circleMarker(layer, { radius: feature.properties.mag * 10 });
    }
    var earthquakes = L.geoJSON(earthquakeData, {
        // add popups
        onEachFeature: onEachFeature,
        // add circles
        pointToLayer: pointFunction
    });

    // send our earthquake to createMap function
    createMap(earthquakes);
}


