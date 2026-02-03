"use client";

import { useEffect, useRef } from "react";

// Typ paczkomatu zwracanego przez Geowidget
export type ParcelLockerPoint = {
  id: string;
  name: string;
  address?: string;
  city?: string;
  zip?: string;
};

// Typ eventu emitowanego przez Geowidget
type GeowidgetEvent = CustomEvent<ParcelLockerPoint>;

type ParcelLockerModalProps = {
  open: boolean;
  onClose: () => void;
  onSelectPoint: (point: ParcelLockerPoint) => void;
  token: string;
};

export function ParcelLockerModal({ open, onClose, onSelectPoint, token }: ParcelLockerModalProps) {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLElement | null>(null);

  // Ładowanie CSS i JS Geowidget tylko raz
  useEffect(() => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://geowidget.inpost.pl/inpost-geowidget.css";
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.src = "https://geowidget.inpost.pl/inpost-geowidget.js";
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(css);
      document.head.removeChild(script);
    };
  }, []);

  // Tworzenie widgetu programowo przy każdym otwarciu modalu
  useEffect(() => {
    if (!open || !widgetContainerRef.current) return;

    // Czyścimy stary widget (przy ponownym otwarciu)
    widgetContainerRef.current.innerHTML = "";

    const widget = document.createElement("inpost-geowidget");
    widget.setAttribute("token", token);
    widget.setAttribute("language", "pl");
    widget.setAttribute("config", "parcelCollect");

    // Listener na wybór paczkomatu
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<ParcelLockerPoint>;
      onSelectPoint(customEvent.detail);
      onClose();
    };

    widget.addEventListener("inpost.geowidget.pointselect", handler);

    // Dodajemy widget do kontenera
    widgetContainerRef.current.appendChild(widget);
    widgetRef.current = widget;

    // Cleanup przy zamknięciu lub odmontowaniu
    return () => {
      widget.removeEventListener("inpost.geowidget.pointselect", handler);
    };
  }, [open, token, onSelectPoint, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-w-full relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">Wybierz paczkomat</h2>
        <div ref={widgetContainerRef} className="w-full h-[400px]" />
      </div>
    </div>
  );
}
