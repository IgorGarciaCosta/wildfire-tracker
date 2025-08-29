import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingOrErrorOverlay from "./LoadingOrErrorOverlay";

export default function EonetLogger() {
  const [showError, setShowError] = useState(true); // controla visibilidade do card

  const { data, isLoading, error } = useQuery({
    queryKey: ["eonet", "wildfires"],
    queryFn: async () => {
      const res = await fetch(
        "https://eonet.gsfc.nasa.gov/api/v2.1/events?category=wildfires"
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  // Loga quando chegar
  useEffect(() => {
    if (data) console.log("EONET data:", data);
  }, [data]);

  return (
    <>
      <LoadingOrErrorOverlay
        isLoading={isLoading}
        error={error && showError ? (error as Error).message : null}
        onClose={() => setShowError(false)}
      />
      {/* componente não exibe mais nada */}
    </>
  );
}
