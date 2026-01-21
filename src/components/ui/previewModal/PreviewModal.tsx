"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { ImageWithSkeleton } from "../imageWithSkeleton/ImageWithSkeleton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt?: string;
};

export default function PreviewModal({
  isOpen,
  onClose,
  imageUrl,
  imageAlt = "",
  imageWidth,
  imageHeight,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      aria-modal
      role="dialog"
    >
      <div className="relative max-w-5xl mx-4 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Zamknij podgląd"
          className="absolute flex items-center justify-center size-12 top-3 right-3 z-10  bg-white p-2 shadow hover:opacity-85 transition-opacity cursor-pointer"
        >
          <X size="32" />
        </button>

        <ImageWithSkeleton
          src={imageUrl}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="max-h-[80vh] max-w-[90vw] w-auto h-auto object-contain"
          wrapClassName="relative flex bg-white items-center justify-center max-h-[80vh] max-w-[90vw]"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>
    </div>
  );
}
