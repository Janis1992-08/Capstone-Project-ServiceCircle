import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  useEffect(() => {
    // Überprüfe, ob die Karte bereits initialisiert wurde
    if (!document.getElementById('map').classList.contains('leaflet-container')) {
      // Zentriere die Karte auf Deutschland
      const map = L.map('map').setView([51.1657, 10.4515], 6); // Deutschland-Koordinaten und Zoom-Level

      // Tile layer from OpenStreetMap
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      // Geolocation
      map.locate({ setView: true, maxZoom: 16 });

      // Location Found Event
      function onLocationFound(event) {
        const radius = event.accuracy;

        L.marker(event.latlng)
          .addTo(map)
          .bindPopup(`You are within ${radius} meters from this point`)
          .openPopup();

        L.circle(event.latlng, radius).addTo(map);
      }

      map.on('locationfound', onLocationFound);

      // Location Error Event
      function onLocationError(event) {
        alert(event.message);
      }

      map.on('locationerror', onLocationError);
    }

    // Clean up function
    return () => {
      // Perform any cleanup or remove event listeners here if needed
    };
  }, []); // Empty dependency array ensures useEffect runs once on component mount

  return <div id="map" style={{ height: '50vh', width: '50vw' }}></div>;
};

export default Map;
