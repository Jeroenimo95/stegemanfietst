// Stijl voor verhaal categorie: Oorlog
var oorlogStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 0.95,
        src: 'img/verhaal/verhaal_rood.png',
        scale: 0.4
    }))
});

// Stijl voor verhaal categorie: Cultuur
var cultuurStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 0.95,
        src: 'img/verhaal/verhaal_paars.png',
        scale: 0.4
    }))
});

// Stijl voor verhaal categorie: Geschiedenis
var geschiedenisStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 0.95,
        src: 'img/verhaal/verhaal_oranje.png',
        scale: 0.4
    }))
});

// Stijl voor verhaal categorie: Kunst
var kunstStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 0.95,
        src: 'img/verhaal/verhaal_groen.png',
        scale: 0.4
    }))
});

// Stijl voor verhaal categorie: Toekomst
var toekomstStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 0.95,
        src: 'img/verhaal/verhaal_turqouse.png',
        scale: 0.4
    }))
});

// Stijl voor osm categorie: Horeca
var horecatStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 0.95,
        src: 'img/verhaal/verhaal_turqouse.png',
        scale: 0.4
    }))
});

// Stijl voor osm categorie: Faciliteiten
var faciliteitenStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 0.95,
        src: 'img/verhaal/verhaal_turqouse.png',
        scale: 0.4
    }))
});

// Stijl voor osm categorie: Vrije tijd
var vrijeStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 0.95,
        src: 'img/verhaal/verhaal_turqouse.png',
        scale: 0.4
    }))
});

// Stijl voor osm categorie: Naar buiten
var buitenStyle = new ol.style.Style({
    image: new ol.style.Icon(({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 0.95,
        src: 'img/verhaal/verhaal_turqouse.png',
        scale: 0.4
    }))
});

var routeStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        width: 3,
        color: [255, 0, 0, 1]
    })
});


var verhalenStyle = function (feature) {
    // voor elke variabele binnen de categorie column wordt een stijl toegepast
    var categoriefield = feature.get('categorie');
    switch (categoriefield) {
        case "Oorlog":
            return oorlogStyle;
            break;
        case "Cultuur":
            return cultuurStyle;
            break;
        case "Geschiedenis":
            return geschiedenisStyle;
            break;
        case "Kunst":
            return kunstStyle;
            break;
        case "Toekomst":
            return toekomstStyle;
            break;
        default:
            return fault;
            break;
    }
}