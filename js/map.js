function initMap() {
    var dragAndDropInteraction = new ol.interaction.DragAndDrop({
        formatConstructors: [
            ol.format.GPX,
            ol.format.GeoJSON,
            ol.format.IGC,
            ol.format.KML,
            ol.format.TopoJSON
        ]
    });

    map = new ol.Map({
        controls: [],
        target: "map",
        interactions: ol.interaction.defaults().extend([dragAndDropInteraction]),
        layers: [
            TransportMap,
            MobileAtlasMap,
            SatalietMap,
            OSMmap,
            OpenCycleMap,
            OutdoorMap,
            cloudLayer,
            OpenMapSurfer_AdminBounds
        ],
        view: StartView,
        theme: null,
    });

    // Current selection
    var sLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: 'rgb(255,165,0)',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255,165,0,.3)'
                })
            }),
            stroke: new ol.style.Stroke({
                color: 'rgb(255,165,0)',
                width: 3
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255,165,0,.3)'
            })
        })
    });
    map.addLayer(sLayer);

    // Set the search control 
    var search = new ol.control.SearchNominatim(
        {	//target: $(".options").get(0),
            polygon: $("#polygon").prop("checked"),
            reverse: true,
            position: true	// Search, with priority to geo position
        });
    map.addControl(search);

    // Select feature when click on the reference index
    search.on('select', function (e) {	// console.log(e);
        sLayer.getSource().clear();
        // Check if we get a geojson to describe the search
        if (e.search.geojson) {
            var format = new ol.format.GeoJSON();
            var f = format.readFeature(e.search.geojson, { dataProjection: "EPSG:4326", featureProjection: map.getView().getProjection() });
            sLayer.getSource().addFeature(f);
            var view = map.getView();
            var resolution = view.getResolutionForExtent(f.getGeometry().getExtent(), map.getSize());
            var zoom = view.getZoomForResolution(resolution);
            var center = ol.extent.getCenter(f.getGeometry().getExtent());
            console.log(center)
            // redraw before zoom
            setTimeout(function () {
                view.animate({
                    center: center,
                    zoom: Math.min(zoom, 16)
                });
            }, 100);
        }
        else {
            map.getView().animate({
                center: e.coordinate,
                zoom: Math.max(map.getView().getZoom(), 16)
            });
        }
    });

    // var sidebar = new ol.control.Sidebar({ element: 'sidebar', position: 'left' });
    // map.addControl(sidebar);

    //
    //Custom Buttons
    //

    //Zoom in
    $('#zoomin').click(function () {
        console.log('click');
        map.getView().setZoom(map.getView().getZoom() + 1);
    });

    //Zoom out
    $('#zoomout').click(function () {
        console.log('click');
        map.getView().setZoom(map.getView().getZoom() - 1);
    });

    // 
    //Functions
    //

    // DBPedia layer source
    vectorSource = new ol.source.Overpass({
        //way: false,
        filter: ['highway=bus_stop'],
        //filter: [ 'leisure' ], 
        // filter: [ 'leisure', 'sport=swimming' ], 
        // filter: [ 'highway' ], 
        // Tile strategy load at zoom 14
        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({ minZoom: 14, maxZoom: 14, tileSize: 512 })),
        // Bbox strategy : reload at each move
        //strategy: ol.loadingstrategy.bbox,
    });

    // Force layer reload on resolution change 
    map.getView().on('change:resolution', function (evt) {	//vectorSource.clear();
        select.getFeatures().clear();
        if (map.getView().getZoom() < 14) $("#select").text("Zoom to load data...");
        else $("#select").first().text("");
    });

    vector = new ol.layer.Vector({
        name: 'OSM',
        source: vectorSource,
        // Limit resolution to avoid large area request
        maxResolution: 10, // > zoom 14
    });

    map.addLayer(vector);

    // Control Select 
    select = new ol.interaction.Select({
        hitTolerance: 3,
        condition: ol.events.condition.click
    });
    map.addInteraction(select);
    // On selected
    select.getFeatures().on(['add', 'remove'], function (e) {
        var info = $("#select").html("");
        if (e.type == "add") {
            var el = e.element;
            var ul = $('<ul>').appendTo(info);
            var prop = el.getProperties();
            for (var i in prop) {
                if (i !== 'geometry') {
                    li = $('<li>')
                        .html('<i>' + i + "</i>: " + prop[i])
                        .appendTo(ul);
                }
            }
        }
    });

    //Drag and Drop
    dragAndDropInteraction.on('addfeatures', function (event) {
        var dragdropVectorSource = new ol.source.Vector({
            features: event.features
        });
        map.addLayer(new ol.layer.Vector({
            source: dragdropVectorSource
        }));
        map.getView().fit(dragdropVectorSource.getExtent());
    });

    var displayFeatureInfo = function (pixel) {
        var features = [];
        map.forEachFeatureAtPixel(pixel, function (feature) {
            features.push(feature);
        });
        if (features.length > 0) {
            var info = [];
            var i, ii;
            for (i = 0, ii = features.length; i < ii; ++i) {
                info.push(features[i].get('name'));
            }
            document.getElementById('info').innerHTML = info.join(', ') || '&nbsp';
        } else {
            document.getElementById('info').innerHTML = '&nbsp;';
        }
    };

    map.on('pointermove', function (evt) {
        if (evt.dragging) {
            return;
        }
        var pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
    });

    map.on('click', function (evt) {
        displayFeatureInfo(evt.pixel);
    });

    //WMS Getfeatureinfo
    // map.on('singleclick', function (evt) {
    //     document.getElementById('mapinfo').innerHTML = '';
    //     var viewResolution = /** @type {number} */ (view.getResolution());
    //     var url = wmsSource.getFeatureInfoUrl(
    //         evt.coordinate, viewResolution, 'EPSG:3857',
    //         { 'INFO_FORMAT': 'text/html' });
    //     if (url) {
    //         fetch(url)
    //             .then(function (response) { return response.text(); })
    //             .then(function (html) {
    //                 document.getElementById('mapinfo').innerHTML = html;
    //             });
    //     }
    // });

    // map.on('pointermove', function (evt) {
    //     if (evt.dragging) {
    //         return;
    //     }
    //     var pixel = map.getEventPixel(evt.originalEvent);
    //     var hit = map.forEachLayerAtPixel(pixel, function () {
    //         return true;
    //     });
    //     map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    // });

    // Layerswitcher
    buildLayerSwitcher();

    $("input[name='basemapRadio']").on("change", function () {
        let selectedLayer = $("input[name='basemapRadio']:checked").val();
        console.log($("input[name='basemapRadio']:checked").val());
        $.each(mapLayers, function (i, layer) {
            if (i == selectedLayer) {
                layer.setVisible(true);
            } else {
                if (layer.values_.type == "base") {
                    layer.setVisible(false);
                }
            }
        });
    });

} //end of InitMap

//OverPass API
function setFilter(filter) {
    console.log('filter:', filter.split(','))
    vectorSource = new ol.source.Overpass({
        //relation: false,
        filter: filter.split(','),
        // Tile strategy load at zoom 14
        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({ minZoom: 10, maxZoom: 14, tileSize: 512 })),
        // Bbox strategy : reload at each move
        //strategy: ol.loadingstrategy.bbox,
    });
    vector.setSource(vectorSource);
}

// 
//Views
//
function ganaarThuis() {
    map.setView(MillingenView);
}

function ganaarDuitsland() {
    map.setView(DuitslandView);
}

function ganaarZwitserland() {
    map.setView(ZwitserlandView);
}

function ganaarFrankrijk() {
    map.setView(FrankrijkView);
}

function ganaarNederland() {
    map.setView(NederlandView);
}
