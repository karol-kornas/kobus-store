"use client";

import { useInView } from "react-intersection-observer";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { normalizeWpUrl } from "@/utils/normalizeWpUrl";

import { ButtonLink } from "@/components/ui/button/Button";
import { HeroSlide } from "./heroSlider.types";

interface Props {
  slides: HeroSlide[];
}

export function HeroSlider({ slides }: Props) {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const [isPaused, setIsPaused] = useState(false);

  const isEffectivelyPaused = isPaused || !inView;

  return (
    <div className="relative" ref={ref}>
      <div>
        {slides.map((item, i) => {
          return (
            i === 0 && (
              <div key={i}>
                <div className="flex justify-center relative w-full h-[58vh] min-h-108 max-h-144 md:max-h-full md:h-170.75">
                  {item.image && (
                    <div className="absolute inset-0">
                      <picture>
                        <source media="(max-width: 768px)" srcSet={item.imageMobile} />
                        <img
                          src={item.image}
                          fetchPriority={i === 0 ? "high" : "auto"}
                          loading={i === 0 ? "eager" : "lazy"}
                          sizes="100vw"
                          className="absolute top-0 left-0 size-full object-cover"
                          alt=""
                        />
                      </picture>
                    </div>
                  )}

                  {item.video && (
                    <video
                      ref={(el) => {
                        if (!el) return;

                        if (!isEffectivelyPaused) {
                          if (!el.src) {
                            el.src = item.video;
                            el.load();
                          }

                          el.play().catch(() => {});
                        }

                        if (isEffectivelyPaused) {
                          el.pause();
                        }
                      }}
                      className="absolute inset-0 w-full h-full object-cover"
                      loop
                      muted
                      playsInline
                    />
                  )}

                  {item.isHtmlText && (
                    <>
                      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/65 mix-blend-multiply"></div>
                      <div
                        className="text-white flex items-center justify-end pb-16 md:pb-28.5 px-3 flex-col absolute inset-0 size-full text-center gap-2"
                        data-swiper-parallax-x="-40%"
                      >
                        <strong className="block text-[0.875rem] font-normal tracking-widest font-display uppercase leading-[1.1] max-w-[20rem] sm:max-w-130">
                          {item.label}
                        </strong>
                        <h2
                          className="text-[1.8125rem] max-w-[20rem] sm:max-w-130 md:text-[2.875rem] leading-[1.1] font-serif "
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />

                        <p className="text-[0.875rem] max-w-[20rem] sm:max-w-130 md:text-[1.125rem] font-display">
                          {item.description}
                        </p>
                        {item.link && (
                          <ButtonLink href={normalizeWpUrl(item.link)} variant="white" className="mt-4">
                            {item.buttonText ? item.buttonText : "Sprawdź"}
                          </ButtonLink>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          );
        })}
        <div className="flex justify-start items-center absolute bottom-0 left-0 w-full px-3 md:px-8 pb-4 md:pb-8 gap-1 text-white">
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="relative cursor-pointer z-1 flex items-center justify-center bg-neutral-800/30 hover:bg-neutral-800 w-10 h-10 
            transition-colors ease-out rounded-full js-pause-slider"
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
            <span className="sr-only">Zatrzymaj wideo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
