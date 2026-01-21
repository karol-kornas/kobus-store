"use client";

import { useInView } from "react-intersection-observer";
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/parallax";
import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { normalizeWpUrl } from "@/utils/normalizeWpUrl";
import { NavigationOptions } from "swiper/types";
import { ButtonLink } from "@/components/ui/button/Button";
import { HeroSlide } from "./heroSlider.types";

interface Props {
  slides: HeroSlide[];
}

export function HeroSlider({ slides }: Props) {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<null | number>(null);
  const [isPaused, setIsPaused] = useState(false);

  const isEffectivelyPaused = isPaused || !inView;

  return (
    <div ref={ref}>
      <Swiper
        style={
          {
            "--swiper-pagination-color": "#fff",
            "--swiper-pagination-bullet-inactive-color": "#fff",
            "--swiper-pagination-bullet-width": "0.75rem",
            "--swiper-pagination-bullet-height": "0.75rem",
            "--swiper-pagination-bottom": "2rem",
          } as React.CSSProperties
        }
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
        onBeforeInit={(swiper) => {
          const navigation = swiper.params.navigation as NavigationOptions;

          navigation.prevEl = prevRef.current;
          navigation.nextEl = nextRef.current;
        }}
        parallax
        speed={700}
        effect="fade"
        rewind={true}
        fadeEffect={{
          crossFade: true,
        }}
        // autoplay={{
        //   delay: 10000,
        //   pauseOnMouseEnter: true,
        //   disableOnInteraction: false,
        // }}
        pagination={{ clickable: true, dynamicBullets: true }}
        onInit={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSlideChangeTransitionEnd={(swiper) => setPreviousIndex(swiper.previousIndex)}
      >
        {slides.map((item, i) => {
          return (
            <SwiperSlide key={i}>
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

                      if (activeIndex === i && !isEffectivelyPaused) {
                        if (!el.src) {
                          el.src = item.video;
                          el.load();
                        }

                        el.play().catch(() => {});
                      }

                      if (previousIndex === i) {
                        el.pause();
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
            </SwiperSlide>
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
          <button
            ref={prevRef}
            className="relative cursor-pointer z-1 flex items-center justify-center bg-neutral-800/30 hover:bg-neutral-800 w-10 h-10 
            rounded-full transition-colors ease-out js-slider-prev ml-auto md:ml-0"
          >
            <ChevronLeft size="24" />
            <span className="sr-only">Poprzedni slajd</span>
          </button>
          <button
            ref={nextRef}
            className="relative cursor-pointer z-1 flex items-center justify-center bg-neutral-800/30 hover:bg-neutral-800 w-10 h-10 
            rounded-full transition-colors ease-out js-slider-next"
          >
            <ChevronRight size="24" />
            <span className="sr-only">Kolejny slajd</span>
          </button>
        </div>
      </Swiper>
    </div>
  );
}
