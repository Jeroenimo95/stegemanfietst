// functie van het switchen van de lagen
function switchOverlay(layerNr) {
    // aan- of uitzetten van een laag als checkbox verandert
    if (mapLayers[layerNr].values_.visible) { // is de laag zichtbaar?
        mapLayers[layerNr].setVisible(false); // zet de laag uit
    } else { // anders
        mapLayers[layerNr].setVisible(true); // zet de laag aan
    }
}

// functie van het aanmaken van de lagenswitcher
function buildLayerSwitcher() {
    $("#overlayselectlist").html(""); //Leegmaken van de overlay lagenswitcher op de pagina

    $("#basemapselectlist").html("");

    mapLayers = map.getLayers().getArray(); // ophalen van alle lagen van de kaart
    $.each(mapLayers, function (i, layer) { // voor elke laag
        if (layer.values_.type == "overlay") {
            // als het een overlay-Laag is
            // opbouwen van de HTML code voor een checkbox
            let liTekst = '<li><input type="checkbox" onchange="switchOverlay(';
            liTekst += i + ')" id="overlay' + i + '"';
            if (layer.values_.visible) { //als de laag zichtbaar is moet de checkbox aangevinkt zijn.
                liTekst += " checked";
            }
            liTekst +=
                '><label for="overlay' +
                i +
                '">' +
                layer.values_.title +
                "</label>" +
                "</li>";
            $("#overlayselectlist").append(liTekst); // voeg de checkbox toe aan de pagina 
            // voor de base maps lagen switcher
            //<input type="radio" name="demo" value="one" id="radio-one" class="form-radio" checked><label for="radio-one">Radio</label>

        } else {
            if (layer.values_.type == "base") {
                // als het een basemap-Laag is
                // opbouwen van de HTML code voor een radio button
                let liTekst = '<li><input type="radio" name="basemapRadio" class="form-radio"';
                liTekst += i + ')" id="base' + i + '" value="' + i + '"';
                if (layer.values_.visible) { //als de laag zichtbaar is moet de radio button aangevinkt zijn.
                    liTekst += " checked";
                }
                liTekst +=
                    '><label for="base' +
                    i +
                    '">' +
                    layer.values_.title +
                    "</label>" +
                    "</li>";
                $("#basemapselectlist").append(liTekst); // voeg de radio button toe aan de pagina
            }
        }
    });
}