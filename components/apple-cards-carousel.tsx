"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";

import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";

import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "./useOutsideClick";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
  spatialMode?: boolean;
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
  spatialMode: boolean;
}>({
  onCardClose: () => {},
  currentIndex: 0,
  spatialMode: false,
});

export const Carousel = ({
  items,
  initialScroll = 0,
  spatialMode = false,
}: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const isMobile = () =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false;

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  // Spatial-mode drag/pinch
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!spatialMode || !carouselRef.current) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      scrollLeft: carouselRef.current.scrollLeft,
    });
    e.preventDefault();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !spatialMode || !carouselRef.current) return;
    e.preventDefault();
    const walkX = (e.clientX - dragStart.x) * 2;
    carouselRef.current.scrollLeft = dragStart.scrollLeft - walkX;
  };

  const handlePointerUp = () => {
    if (!spatialMode) return;
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!spatialMode || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX,
      scrollLeft: carouselRef.current?.scrollLeft || 0,
    });
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !spatialMode || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const walkX = (touch.clientX - dragStart.x) * 1.5;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = dragStart.scrollLeft - walkX;
    }
  };

  const handleTouchEnd = () => {
    if (!spatialMode) return;
    setIsDragging(false);
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex, spatialMode }}
    >
      <div
        className="relative w-full"
        {...(spatialMode ? { ["enable-xr"]: true } : {})}
        style={
          spatialMode
            ? {
                position: "relative",
                ["--xr-back" as any]: "20",
                ["--xr-background-material" as any]: "translucent",
                borderRadius: "30px",
                padding: "2rem",
              }
            : {}
        }
      >
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          {...(spatialMode ? { ["enable-xr-monitor"]: true } : {})}
          style={
            spatialMode
              ? {
                  cursor: isDragging ? "grabbing" : "grab",
                  userSelect: "none",
                }
              : {}
          }
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          />

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "max-w-7xl mx-auto"
            )}
            {...(spatialMode ? { ["enable-xr-monitor"]: true } : {})}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={`card-${index}`}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
                {...(spatialMode ? { ["enable-xr"]: true } : {})}
                style={
                  spatialMode
                    ? {
                        position: "relative",
                        ["--xr-back" as any]: `${30 + ((index % 3) * 10)}`,
                        ["--xr-background-material" as any]: "transparent",
                        transform: `rotateY(${
                          index % 2 === 0 ? "2deg" : "-2deg"
                        }) rotateX(${Math.sin(index * 0.5) * 2}deg)`,
                        transformOrigin: "center",
                        transition:
                          "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      }
                    : {}
                }
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div
          className="flex justify-end gap-2 mr-10"
          {...(spatialMode ? { ["enable-xr"]: true } : {})}
          style={
            spatialMode
              ? {
                  position: "relative",
                  ["--xr-back" as any]: "40",
                  ["--xr-background-material" as any]: "thick",
                  borderRadius: "25px",
                  padding: "12px",
                }
              : {}
          }
        >
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            {...(spatialMode ? { ["enable-xr"]: true } : {})}
            style={
              spatialMode
                ? {
                    position: "relative",
                    ["--xr-back" as any]: "10",
                    ["--xr-background-material" as any]: "thin",
                    cursor: "pointer",
                    borderRadius: "50%",
                  }
                : {}
            }
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
            {...(spatialMode ? { ["enable-xr"]: true } : {})}
            style={
              spatialMode
                ? {
                    position: "relative",
                    ["--xr-back" as any]: "10",
                    ["--xr-background-material" as any]: "thin",
                    cursor: "pointer",
                    borderRadius: "50%",
                  }
                : {}
            }
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
  const cardRef = useRef<HTMLButtonElement>(null);
  const { onCardClose, spatialMode } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    document.body.style.overflow = open ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  const handlePointerDown = () => {
    if (!spatialMode) return;
    if (cardRef.current) {
      cardRef.current.style.transform = `${
        cardRef.current.style.transform || ""
      } scale(0.95)`;
    }
  };

  const handlePointerUp = () => {
    if (!spatialMode) return;
    if (cardRef.current) {
      cardRef.current.style.transform =
        cardRef.current.style.transform?.replace("scale(0.95)", "") || "";
    }
    setTimeout(() => handleOpen(), 100);
  };

  const handleHover = () => {
    if (!spatialMode) return;
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    if (!spatialMode) return;
    setIsHovered(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
              {...(spatialMode ? { ["enable-xr"]: true } : {})}
              style={
                spatialMode
                  ? { ["--xr-background-material" as any]: "thick" }
                  : {}
              }
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
              {...(spatialMode ? { ["enable-xr"]: true } : {})}
              style={
                spatialMode
                  ? {
                      position: "relative",
                      ["--xr-back" as any]: "100",
                      ["--xr-background-material" as any]: "thick",
                      borderRadius: "30px",
                    }
                  : {}
              }
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
                {...(spatialMode ? { ["enable-xr"]: true } : {})}
                style={
                  spatialMode
                    ? {
                        position: "relative",
                        ["--xr-back" as any]: "20",
                        ["--xr-background-material" as any]: "translucent",
                        cursor: "pointer",
                      }
                    : {}
                }
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>

              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-black dark:text-white"
                {...(spatialMode ? { ["enable-xr"]: true } : {})}
                style={
                  spatialMode
                    ? {
                        position: "relative",
                        ["--xr-back" as any]: "10",
                        ["--xr-background-material" as any]: "thin",
                        borderRadius: "10px",
                        padding: "8px",
                      }
                    : {}
                }
              >
                {card.category}
              </motion.p>

              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
                {...(spatialMode ? { ["enable-xr"]: true } : {})}
                style={
                  spatialMode
                    ? {
                        position: "relative",
                        ["--xr-back" as any]: "15",
                        ["--xr-background-material" as any]: "transparent",
                      }
                    : {}
                }
              >
                {card.title}
              </motion.p>

              <div
                className="py-10"
                {...(spatialMode ? { ["enable-xr"]: true } : {})}
                style={
                  spatialMode
                    ? {
                        position: "relative",
                        ["--xr-back" as any]: "5",
                        ["--xr-background-material" as any]: "transparent",
                      }
                    : {}
                }
              >
                {card.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        ref={cardRef}
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={!spatialMode ? () => setOpen(true) : undefined}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerEnter={handleHover}
        onPointerLeave={handleHoverEnd}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
        {...(spatialMode ? { ["enable-xr"]: true } : {})}
        style={
          spatialMode
            ? {
                position: "relative",
                ["--xr-background-material" as any]: isHovered
                  ? "translucent"
                  : "thin",
                borderRadius: "24px",
                cursor: "pointer",
                transform: isHovered
                  ? "translateZ(20px) scale(1.02)"
                  : "translateZ(0)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transformOrigin: "center",
              }
            : {}
        }
      >
        <div
          className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none"
          {...(spatialMode ? { ["enable-xr"]: true } : {})}
          style={
            spatialMode
              ? { ["--xr-background-material" as any]: "transparent" }
              : {}
          }
        />
        <div
          className="relative z-40 p-8"
          {...(spatialMode ? { ["enable-xr"]: true } : {})}
          style={
            spatialMode
              ? {
                  position: "relative",
                  ["--xr-back" as any]: "15",
                  ["--xr-background-material" as any]: "thick",
                  borderRadius: "20px",
                  margin: "8px",
                }
              : {}
          }
        >
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-white text-sm md:text-base font-medium font-sans text-left"
            {...(spatialMode ? { ["enable-xr"]: true } : {})}
            style={
              spatialMode
                ? {
                    position: "relative",
                    ["--xr-back" as any]: "5",
                    ["--xr-background-material" as any]: "transparent",
                  }
                : {}
            }
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
            {...(spatialMode ? { ["enable-xr"]: true } : {})}
            style={
              spatialMode
                ? {
                    position: "relative",
                    ["--xr-back" as any]: "8",
                    ["--xr-background-material" as any]: "transparent",
                  }
                : {}
            }
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="object-cover absolute z-10 inset-0"
        />
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
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
