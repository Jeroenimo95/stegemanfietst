/*
BASE maps
*/
// toevoegen van Mapbox layer
let OpenCycleMap = new ol.layer.Tile({
    title: "OpenCycle",
    type: "base",
    visible: false,
    source: new ol.source.XYZ({
        url: "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=c5d432b20da2466caedd226d7e2cf400"
    })
});

// toevoegen van OSM Humanitarian layer
let OSMmap = new ol.layer.Tile({
    title: "Open Street Map",
    type: "base",
    visible: true,
    source: new ol.source.XYZ({
        url: "https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    })
});

// toevoegen van OSM Humanitarian layer
let TransportMap = new ol.layer.Tile({
    title: "Transport",
    type: "base",
    visible: true,
    source: new ol.source.XYZ({
        url: "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=c5d432b20da2466caedd226d7e2cf400"
    })
});

// toevoegen van OSM Humanitarian layer
let MobileAtlasMap = new ol.layer.Tile({
    title: "Mobile Atlas",
    type: "base",
    visible: true,
    source: new ol.source.XYZ({
        url: "https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=c5d432b20da2466caedd226d7e2cf400"
    })
});

// toevoegen van Mapbox layer
let OutdoorMap = new ol.layer.Tile({
    title: "Outdoor",
    type: "base",
    visible: false,
    source: new ol.source.XYZ({
        url: "https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=c5d432b20da2466caedd226d7e2cf400"
    })
});

// toevoegen van PDOK Actueel Satalliet layer
let SatalietMap = new ol.layer.Image({
    title: "Sataliet",
    type: "base",
    visible: false,
    source: new ol.source.ImageWMS({
        url: "https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wms",
        params: {
            LAYERS: ["Actueel_ortho25"]
        }
    })
});

/*
Overlays WMS
*/

//Toevoegen OpenMapSurfer Bestuurlijke Grenzen
let OpenMapSurfer_AdminBounds = new ol.layer.Tile({
    title: "Bestuurlijke Grenzen",
    type: "overlay",
    visible: false,
    source: new ol.source.XYZ({
        url: "https://maps.heigit.org/openmapsurfer/tiles/adminb/webmercator/{z}/{x}/{y}.png",
        maxZoom: 18,
        attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
});

// Toevoegen van labyrintlijnen via Geoserver WMS
// De source van de lijnen laag
let lijnenSource = new ol.source.ImageWMS({
    url: "http://gmd.has.nl/geoserver/engineer_1920_951011542/wms",
    params: {
        LAYERS: "engineer_1920_951011542:wh_lijnen"
    }
});
// toevoegen van de laag met link naar de bron laag.
let lijnenLayer = new ol.layer.Image({
    title: "Labyrint lijnen",
    type: "overlay",
    visible: true,
    source: lijnenSource
});

var cloudLayer = new ol.layer.Tile({
    title: "Clouds",
    type: "overlay",
    source: new ol.source.XYZ({
        // Replace this URL with a URL you generate. To generate an ID go to http://home.openweathermap.org/
        // and click "map editor" in the top right corner. Make sure you're registered!
        url: 'http://maps.owm.io:8091/56cde48b4376d3010038aa91/{z}/{x}/{y}?hash=my_hash',
        tileOptions: {
            crossOriginKeyword: 'anonymous'
        },
        crossOrigin: null
    })
});

// Toevoegen van labyrintlijnen via Geoserver WMS
// De source van de OSMDATA laag
let osmdataSource = new ol.source.ImageWMS({
    url: "http://gmd.has.nl/geoserver/engineer_1920_951011542/wms",
    params: {
        LAYERS: "engineer_1920_951011542:wh_lijnen"
    }
});
// toevoegen van de laag met link naar de bron laag.
let osmdataLayer = new ol.layer.Image({
    title: "Labyrint lijnen",
    type: "overlay",
    visible: true,
    source: lijnenSource
});

