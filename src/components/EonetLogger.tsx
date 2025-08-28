import { useEffect } from "react";

export default function EonetLogger() {
  useEffect(() => {
    fetch("https://eonet.gsfc.nasa.gov/api/v2.1/events?category=wildfires")
      .then((res) => res.json())
      .then((json) => console.log("EONET data:", json))
      .catch((err) => console.error("Erro EONET:", err));
  }, []);

  return null; // nenhum elemento visual
}
