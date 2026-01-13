"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button/Button";
import { useState } from "react";
import PreviewModal from "@/components/ui/previewModal/PreviewModal";
import { ImageWithSkeleton } from "@/components/ui/imageWithSkeleton/ImageWithSkeleton";

type Props = {
  additionalServices:
    | {
        id: number;
        name: string;
        price: number;
        thumbnail?: string;
        thumbnail_width?: number;
        thumbnail_height?: number;
        preview_image?: string;
        preview_image_width?: number;
        preview_image_height?: number;
        add_to_cart_url: string;
      }[]
    | undefined;
};

type PreviewImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
} | null;

export function ProductAdditionalServices({ additionalServices }: Props) {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<PreviewImage>(null);
  return (
    additionalServices && (
      <div className="mt-6">
        <p className="font-bold uppercase text-sm">Uszlachetnij swój egzemplarz</p>
        <div className="overflow-x-auto mt-6">
          <div className="flex gap-3 pb-5">
            {additionalServices.map((el) => {
              return (
                <article key={el.id} className="flex flex-col max-w-35 min-w-28">
                  {el.thumbnail && (
                    <>
                      <ImageWithSkeleton
                        src={el.thumbnail}
                        alt={el.name}
                        className="w-10"
                        wrapClassName="w-10"
                        width={el.thumbnail_width ?? 40}
                        height={el.thumbnail_height ?? 40}
                        sizes="40px"
                      />
                    </>
                  )}

                  <h3 className="uppercase text-sm leading-tight mt-3 pr-3">{el.name}</h3>

                  <div className="mt-auto pt-2">
                    <div className="font-bold">+{el.price} zł</div>
                    {el.preview_image && (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (el.preview_image) {
                            setPreviewImage({
                              src: el.preview_image,
                              alt: el.name,
                              width: el.preview_image_width ?? 800,
                              height: el.preview_image_height ?? 800,
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
    )
  );
}
