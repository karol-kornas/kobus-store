"use client";

import { Button } from "@/components/ui/button/Button";
import { useState } from "react";
import PreviewModal from "@/components/ui/previewModal/PreviewModal";
import { AdditionalService } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { SmartImage } from "@/components/ui/smartImage/SmartImage";
import { ProductAdditionalServicesItem } from "./ProductAdditionalServicesItem";

type Props = {
  additionalServices: AdditionalService[];
};

export type PreviewImage = {
  src: string;
  srcset?: string;
  sizes?: string;
  width: number;
  height: number;
  alt: string;
} | null;

export function ProductAdditionalServices({ additionalServices }: Props) {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<PreviewImage>(null);

  if (!additionalServices || !additionalServices.length) return null;
  return (
    <div className="mt-6">
      <p className="font-bold uppercase text-sm">Uszlachetnij swój egzemplarz</p>
      <div className="overflow-x-auto mt-6">
        <div className="flex gap-3 pb-5">
          {additionalServices.map((el) => {
            return (
              <ProductAdditionalServicesItem
                key={el.id}
                product={el}
                setPreviewImage={setPreviewImage}
                setOpen={setOpen}
              />
            );
          })}
        </div>
      </div>
      {previewImage && (
        <PreviewModal
          isOpen={open}
          onClose={() => setOpen(false)}
          imageUrl={previewImage.src}
          imageSrcSet={previewImage.srcset}
          imageAlt={previewImage.alt}
          imageWidth={previewImage.width}
          imageHeight={previewImage.height}
        />
      )}
    </div>
  );
}
