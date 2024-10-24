import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

import type { Map as LeafletMap } from "leaflet";
import type { Place } from "../api/Place";

import { MapContainer, TileLayer, Marker } from "react-leaflet";

interface MapProps {
  place: Place | null;
}

function Map({ place }: MapProps) {
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (mapRef.current && place) {
      mapRef.current.flyTo([place.latitude, place.longitude]);
    }
  }, [place]);

  return (
    <MapContainer
      ref={mapRef}
      center={[19.4326296, -99.1331785]}
      zoom={12}
      scrollWheelZoom
      className="h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {place && <Marker position={[place.latitude, place.longitude]} />}
    </MapContainer>
  );
}

export default Map;
