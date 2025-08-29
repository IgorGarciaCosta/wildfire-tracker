import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useWildfires, type WildfirePoint } from "@/hooks/useWildfires";

// Tamanho do contêiner
const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
};

// Centro inicial se a geolocalização falhar
const fallbackCenter = { lat: -15.793889, lng: -47.882778 }; // Brasília

export default function MapView() {
  // Estado que guardará a posição do usuário
  const [myLocation, setMyLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  // Referência ao mapa para poder chamar panTo()
  const mapRef = useRef<google.maps.Map | null>(null);

  /* 1. Pedir a posição quando o componente montar */
  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation não suportada neste navegador.");
      return;
    }

    // Salva o id de “watch” para poder cancelar depois
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setMyLocation(loc);

        // 2. Centraliza e aproxima o mapa
        if (mapRef.current) {
          mapRef.current.panTo(loc);
          mapRef.current.setZoom(14);
        }
      },
      (err) => {
        console.error("Erro ao obter localização:", err);
        // Deixe o mapa no fallbackCenter; você pode exibir um alerta ao usuário aqui.
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  /*wild fires */
  const { data: fires } = useWildfires();

  /* 🔥 1. estado do balão aberto */
  const [selected, setSelected] = useState<WildfirePoint | null>(null);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        onLoad={(map) => {
          mapRef.current = map;
        }}
        mapContainerStyle={containerStyle}
        center={fallbackCenter} // usado só até descobrir a posição real
        zoom={5}
        mapTypeId="roadmap"
      >
        {/* 3. Desenha o marcador se já temos a posição */}
        {myLocation && (
          <Marker
            position={myLocation}
            title="Você está aqui"
            /* Ícone azul circular simples; troque por PNG/SVG se quiser */
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }}
          />
        )}

        {/* marcadores de incêndio */}
        {fires?.map((p) => (
          <Marker
            key={p.id + p.when} // id + data para evitar repetidos
            position={p.position}
            title={`${p.title}\n${new Date(p.when).toLocaleString()}`}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/firedept.png",
              scaledSize: new google.maps.Size(32, 32),
            }}
            onClick={() => setSelected(p)} // 🔥 2. abre o infowindow ao clicar
          />
        ))}

        {/* 🔥 3. InfoWindow se houver selected */}
        {selected && (
          <InfoWindow
            position={selected.position}
            onCloseClick={() => setSelected(null)} //x button
          >
            <div className="max-w-xs">
              <h3 className="font-semibold text-red-700">{selected.title}</h3>
              <p className="text-sm text-gray-700">ID: {selected.id}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}
