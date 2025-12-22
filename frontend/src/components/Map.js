import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = ({ onClose, onSave }) => {
  const [position, setPosition] = useState(null);

  const ClickHandler = ({ onClick }) => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        onClick({ lat, lng });
      },
    });
    return null;
  };

  const handleMapClick = async ({ lat, lng }) => {
    const { city } = await reverseGeocode(lat, lng);
    setPosition({ city, latitude: lat, longitude: lng });
  };

  const reverseGeocode = async (lat, lng) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();

    const address = data.address || {};

    return {
      city:
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        "",
    };
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Choose Location</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-map">
            <MapContainer
              center={[45.80342378462427, 15.969765143127974]}
              zoom={12}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ClickHandler onClick={handleMapClick} />
              {position && (
                <Marker position={[position.latitude, position.longitude]} />
              )}
            </MapContainer>
          </div>

          <div className="modal-location-preview">
            {!position ? (
              <span>Location Not Set</span>
            ) : (
              <span>{`${position.latitude}, ${position.longitude}, ${position.city}`}</span>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-button secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal-button primary"
            onClick={() => onSave(position)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
