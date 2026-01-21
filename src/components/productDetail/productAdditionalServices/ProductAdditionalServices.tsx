"use client";

import { Button } from "@/components/ui/button/Button";
import { useState } from "react";
import PreviewModal from "@/components/ui/previewModal/PreviewModal";
import { ImageWithSkeleton } from "@/components/ui/imageWithSkeleton/ImageWithSkeleton";
import { AdditionalService } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { SmartImage } from "@/components/ui/smartImage/SmartImage";

type Props = {
  additionalServices: AdditionalService[];
};

type PreviewImage = {
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
              <article key={el.id} className="flex flex-col max-w-35 min-w-28">
                {el.thumbnail && (
                  <>
                    <SmartImage
                      src={el.thumbnail.src}
                      alt={el.name}
                      className="w-10"
                      wrapClassName="w-10"
                      width={el.thumbnail.width ?? 40}
                      height={el.thumbnail.height ?? 40}
                      sizes="40px"
                    />
                  </>
                )}

                <h3 className="uppercase text-sm leading-tight mt-3 pr-3">{el.name}</h3>

                <div className="mt-auto pt-2">
                  <div className="font-bold">+{formatPrice(el.price)}</div>
                  {el.preview_image && (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (el.preview_image.src) {
                          setPreviewImage({
                            src: el.preview_image.src,
                            alt: el.name,
                            width: el.preview_image.width ?? 800,
                            height: el.preview_image.height ?? 800,
                          });
                          setOpen(true);
                        }
                      }}
                      className="block text-sm underline text-neutral-500 leading-none my-1 hover:text-neutral-700"
                    >
                      Jak to wygląda?
                    </a>
                  )}

                  <Button size="sm" variant="secondary" className="mt-3">
                    Dodaj <span className="sr-only">do koszyka</span>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      {previewImage && (
        <PreviewModal
          isOpen={open}
          onClose={() => setOpen(false)}
          imageUrl={previewImage.src}
          imageAlt={previewImage.alt}
          imageWidth={previewImage.width}
          imageHeight={previewImage.height}
        />
      )}
    </div>
  );
}
