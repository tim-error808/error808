import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const About = () => {
  const [position, setPosition] = useState(null);

  function ClickHandler({ onClick }) {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        onClick({ lat, lng });
      },
    });
    return null;
  }

  function handleMapClick({ lat, lng }) {
    setPosition({ lat, lng });
  }

  return (
    <div className="about-page">
      <h1>About Page</h1>
      <p>
        {position
          ? `${position.lat}, ${position.lng}.`
          : "Click on the map to get your location."}
      </p>
      <MapContainer
        center={[45.80342378462427, 15.969765143127974]}
        zoom={12}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickHandler onClick={handleMapClick} />
        {position && (
          <Marker position={[position.lat, position.lng]}>
            <Popup>
              Clicked location: <br />
              Lat: {position.lat.toFixed(6)}, Lng: {position.lng.toFixed(6)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default About;
