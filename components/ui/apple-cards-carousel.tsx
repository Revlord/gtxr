// components/ui/apple-cards-carousel.tsx
"use client";
import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "../useOutsideClick";

const xr = (v: Record<string, string | number>) => v as React.CSSProperties;

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft = initialScroll;
    checkScrollability();
  }, [initialScroll]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollLeft();
      if (e.key === "ArrowRight") scrollRight();
    };

    const onWheel = (e: WheelEvent) => {
      if (!e.shiftKey && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollBy({ left: e.deltaY, behavior: "smooth" });
        e.preventDefault();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const checkScrollability = () => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollLeft = () => carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  const handleCardClose = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = isMobile() ? 230 : 384;
    const gap = isMobile() ? 4 : 8;
    const scrollPosition = (cardWidth + gap) * (index + 1);
    el.scrollTo({ left: scrollPosition, behavior: "smooth" });
    setCurrentIndex(index);
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        {/* Spatial carousel container */}
        <div
          ref={carouselRef}
          onScroll={checkScrollability}
          className="__enableXr__ flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          style={xr({
            "--xr-background-material": "translucent",
            "--xr-back": 25,
            "--xr-corner-radius": 20,
          })}
        >
          <div className={cn("absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l")} />

          {/* Cards strip */}
          <div
            className={cn("flex flex-row justify-start gap-4 pl-4", "max-w-7xl mx-auto __enableXr__")}
            style={xr({
              "--xr-back": 10,
            })}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.15 * index, ease: "easeOut" } }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl __enableXr__"
                style={xr({
                  "--xr-back": 15 + index * 3,
                })}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Spatial nav controls */}
        <div
          className="__enableXr__ flex justify-end gap-2 mr-10"
          style={xr({
            "--xr-back": 35,
            "--xr-background-material": "thin",
          })}
        >
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 hover:bg-gray-200 transition-colors __enableXr__"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            style={xr({
              "--xr-back": 10,
              "--xr-background-material": "regular",
            })}
            aria-label="Scroll left"
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 hover:bg-gray-200 transition-colors __enableXr__"
            onClick={scrollRight}
            disabled={!canScrollRight}
            style={xr({
              "--xr-back": 10,
              "--xr-background-material": "regular",
            })}
            aria-label="Scroll right"
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  // 3D tilt state
  const tiltRef = useRef<HTMLButtonElement | null>(null);
  const raf = useRef<number | null>(null);
  const rot = useRef({ rx: 0, ry: 0 });
  const baseZ = 25;

  const animateTilt = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform = `translateZ(24px) rotateX(${rot.current.rx}deg) rotateY(${rot.current.ry}deg)`;
    raf.current = requestAnimationFrame(animateTilt);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    rot.current.rx = -dy * 8;
    rot.current.ry = dx * 10;
    if (raf.current == null) raf.current = requestAnimationFrame(animateTilt);
  };
  const onPointerLeave = () => {
    rot.current = { rx: 0, ry: 0 };
    if (raf.current != null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
    if (tiltRef.current) tiltRef.current.style.transform = "translateZ(24px) rotateX(0deg) rotateY(0deg)";
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            {/* Spatial backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="__enableXr__ bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
              style={xr({
                "--xr-background-material": "translucent",
                "--xr-back": 5,
              })}
            />

            {/* Spatial modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="__enableXr__ max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative shadow-2xl"
              style={xr({
                "--xr-background-material": "thick",
                "--xr-back": 80,
              })}
            >
              {/* Close */}
              <button
                className="__enableXr__ sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                onClick={handleClose}
                style={xr({
                  "--xr-back": 15,
                  "--xr-background-material": "thick",
                })}
                aria-label="Close"
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>

              {/* Depth-layered content */}
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="__enableXr__ text-base font-medium text-black dark:text-white"
                style={xr({
                  "--xr-back": 10,
                  "--xr-background-material": "translucent",
                })}
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="__enableXr__ text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
                style={xr({
                  "--xr-back": 20,
                  "--xr-background-material": "thin",
                })}
              >
                {card.title}
              </motion.p>
              <div
                className="__enableXr__ py-10"
                style={xr({
                  "--xr-back": 30,
                })}
              >
                {card.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Spatial card with 3D tilt + pop */}
      <motion.button
        ref={tiltRef}
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="__enableXr__ rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10 transition-transform duration-300 hover:scale-[1.02]"
        style={xr({
          "--xr-background-material": "translucent",
          "--xr-back": isHovered ? baseZ + 10 : baseZ,
          cursor: "pointer",
        })}
        aria-label={`${card.title} details`}
      >
        {/* gradient overlay */}
        <div
          className="__enableXr__ absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none"
          style={xr({
            "--xr-back": 5,
            "--xr-background-material": "translucent",
          })}
        />

        {/* text with spatial depth */}
        <div
          className="__enableXr__ relative z-40 p-8"
          style={xr({
            "--xr-back": 15,
            "--xr-background-material": "thin",
          })}
        >
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="__enableXr__ text-white text-sm md:text-base font-medium font-sans text-left"
            style={xr({
              "--xr-back": 8,
              "--xr-background-material": "translucent",
            })}
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="__enableXr__ text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
            style={xr({
              "--xr-back": 12,
              "--xr-background-material": "regular",
            })}
          >
            {card.title}
          </motion.p>
        </div>

        {/* background image */}
        <div
          className="__enableXr__ absolute z-10 inset-0"
          style={xr({
            "--xr-back": -5,
            "--xr-background-material": "transparent",
          })}
        >
          <BlurImage src={card.src} alt={card.title} fill className="object-cover select-none" />
        </div>
      </motion.button>
    </>
  );
};

export const BlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn("transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
