import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Location = ({ resetTrigger }) => {
  const [location, setLocation] = useState({ lat: -34.16326, lng: -58.95918 }); // Plaza Eduardo Costa, centro Campana
  const [locationRequested, setLocationRequested] = useState(false); 
  
  // Efecto para resetear cuando se recibe la señal
  useEffect(() => {
    if (resetTrigger > 0) {
      setLocation({ lat: -34.16326, lng: -58.95918 });
      setLocationRequested(false);
    }
  }, [resetTrigger]); 
  
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });

  function LocationMarker({ onChange, position, locationRequested, setLocationRequested }) {
    const map = useMapEvents({
      click(e) {
        onChange(e.latlng);
      },
      locationfound(e) {
        onChange(e.latlng);
      },
    });

    // Solicito ubicación automáticamente al cargar
    useEffect(() => {
      if (map && "geolocation" in navigator && !locationRequested) {
        setLocationRequested(true);
        map.locate({
          setView: false, 
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      }
    }, [map, locationRequested, setLocationRequested]);

    return position === null ? null : (
      <Marker 
        position={position}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const newPosition = marker.getLatLng();
            onChange(newPosition);
          }
        }}
      />
    );
  }

  return (
    <div className="div">
      <div>
        <label className="label">
          Localización*
        </label>
        <p className="small">
          <strong>Instrucciones:</strong> Arrastre el ícono de ubicación (azul), o haga click sobre la calle y altura aproximada, o hacia la calle y entre calles destino
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
        <div className="w-full h-80">
          <MapContainer
            center={[-34.16326, -58.95918]} // Plaza Eduardo Costa, centro Campana
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            className="rounded-xl"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker 
              onChange={setLocation} 
              position={location} 
              locationRequested={locationRequested}
              setLocationRequested={setLocationRequested}
            />
          </MapContainer>
        </div>
      </div>
      
      {location && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-purple-700 text-sm font-medium">
              Su geolocalización actual es: 
              <span className="font-mono ml-1">
                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;
