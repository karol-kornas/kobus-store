"use client";

import { ResponsiveModal } from "@/components/ui/responsiveModal/ResponsiveModal";
import { useEffect, useRef } from "react";

export type ParcelLockerPoint = {
  id: string;
  name: string;
  address?: string;
  city?: string;
  zip?: string;
};

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

  // Tworzenie widgetu przy każdym otwarciu
  useEffect(() => {
    if (!open || !widgetContainerRef.current) return;

    // Czyścimy stary widget
    widgetContainerRef.current.innerHTML = "";

    const widget = document.createElement("inpost-geowidget");
    widget.setAttribute("token", token);
    widget.setAttribute("language", "pl");
    widget.setAttribute("config", "parcelCollect");

    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<ParcelLockerPoint>;
      onSelectPoint(customEvent.detail);
      onClose();
    };

    document.addEventListener("onpointselect", handler);

    widgetContainerRef.current.appendChild(widget);
    widgetRef.current = widget;

    return () => {
      document.removeEventListener("onpointselect", handler);
    };
  }, [open, token, onSelectPoint, onClose]);

  return (
    <ResponsiveModal open={open} onClose={onClose} title="Wybierz paczkomat">
      <div ref={widgetContainerRef} className="w-full h-125" />
    </ResponsiveModal>
  );
}
