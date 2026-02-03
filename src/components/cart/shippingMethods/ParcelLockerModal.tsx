"use client";

import { ResponsiveModal } from "@/components/ui/responsiveModal/ResponsiveModal";
import { useEffect, useRef } from "react";

const GEOWIDGET_BASE_URL = process.env.NEXT_PUBLIC_INPOST_GEOWIDGET_BASE_URL;

export type ParcelLockerPoint = {
  name: string;
  address?: {
    line1: string;
    line2: string;
  };
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
    css.href = `${GEOWIDGET_BASE_URL}/inpost-geowidget.css`;
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.src = `${GEOWIDGET_BASE_URL}/inpost-geowidget.js`;
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
    widget.setAttribute("onpoint", "onpointselect");

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
    <ResponsiveModal open={open} onClose={onClose} title="Wybierz paczkomat" className="md:w-3xl">
      <div ref={widgetContainerRef} className="w-full h-125" />
    </ResponsiveModal>
  );
}
