import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Set your access token from Mapbox
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const MapComponent = ({ locations }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [10.451526, 51.165691], 
      zoom: 5
    });

    
    locations.forEach(location => {if (!isNaN(location.lat) && !isNaN(location.lng)) {
        new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .addTo(map);
        }
        });
        return () => map.remove();
        }, [locations]);
        
       
        return <div id='map' style={{ height: '400px', width: '100%' }}></div>;
        };
        
        export default MapComponent;