import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

/** Ajuste de estilo: ocupar toda a viewport */
const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh", // tela inteira
};

// Coordenadas iniciais (exemplo: Brasília)
const center = { lat: -15.793889, lng: -47.882778 };

export default function MapView() {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        options={{
          mapTypeId: "hybrid", // satélite + labels (bom para incêndios)
          disableDefaultUI: false,
        }}
      >
        {/* Aqui você futuramente colocará marcadores, heatmaps, etc. */}
      </GoogleMap>
    </LoadScript>
  );
}
