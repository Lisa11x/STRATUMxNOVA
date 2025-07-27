// mapdata.js – geladen von STRATUM.NOVA
// Lädt Fundorte aus GeoJSON-Datei und fügt sie der Leaflet-Karte hinzu

async function loadGeojsonLayer(url, layerGroup, icon = null) {
  try {
    const response = await fetch(url);
    const geojson = await response.json();

    L.geoJSON(geojson, {
      pointToLayer: function (feature, latlng) {
        return icon
          ? L.marker(latlng, { icon })
          : L.marker(latlng);
      },
      onEachFeature: function (feature, layer) {
        const props = feature.properties;
        const name = props.name || "Fundort";
        const mineral = props.mineral || "Unbekannt";
        const link = props.link || "#";

        layer.bindPopup(
          `<b>${name}</b><br>Mineral: ${mineral}<br><a href='${link}' target='_blank'>Google Maps</a>`
        );
      }
    }).addTo(layerGroup);
  } catch (error) {
    console.error("Fehler beim Laden von GeoJSON:", error);
  }
}

// Beispielnutzung in deiner index.html:
const layerOfficial = L.layerGroup().addTo(map);
loadGeojsonLayer('stratum_nova_fundorte_A.geojson', layerOfficial);