import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export function FitBounds({ lockers }: { lockers: any[] }) {
  const map = useMap();

  useEffect(() => {
    if (lockers.length === 0) return;

    const bounds = L.latLngBounds(lockers.map((l) => [l.location.latitude, l.location.longitude]));

    map.fitBounds(bounds, {
      padding: [40, 40],
      animate: true,
    });
  }, [lockers, map]);

  return null;
}
