import { useQuery } from "@tanstack/react-query";

export type WildfirePoint = {
  id: string;          // id do evento
  title: string;       // nome
  when: string;        // ISO date da geometria
  position: google.maps.LatLngLiteral; // lat/lng para o <Marker>
};

export const useWildfires = () =>
  useQuery<WildfirePoint[]>({
    queryKey: ["eonet", "wildfires"],
    // 🌍 1) já pedimos só categoria 8 (=wildfires)
    queryFn: async () => {
      const res = await fetch(
        "https://eonet.gsfc.nasa.gov/api/v2.1/events?category=wildfires&status=open"
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json() as EonetEvents;

      // 🌍 2) achata cada geometria em um ponto
      const pts: WildfirePoint[] = [];
      for (const ev of json.events) {
        for (const g of ev.geometries) {
          // coordenadas vêm [lon, lat]!
          const [lng, lat] = g.coordinates;
          pts.push({
            id: ev.id,
            title: ev.title,
            when: g.date,
            position: { lat, lng },
          });
        }
      }
      return pts;
    },
    // evita refetch a cada foco na aba
    staleTime: 1000 * 60 * 5, // 5 min
  });

/* ---------- tipos mínimos de resposta ---------- */
type EonetEvents = {
  events: {
    id: string;
    title: string;
    geometries: { date: string; coordinates: [number, number] }[];
  }[];
};
