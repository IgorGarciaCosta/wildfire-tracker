import MapView from "./components/MapView";
import EonetLogger from "./components/EonetLogger";

export default function App() {
  return (
    <>
      <MapView />
      <EonetLogger /> {/* ← dispara o console.log quando o app carrega */}
    </>
  );
}
