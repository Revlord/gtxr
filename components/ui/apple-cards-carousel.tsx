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
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return typeof window !== "undefined" && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        {/* Enhanced spatial carousel container */}
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
          enable-xr
          style={xr({ 
            "--xr-background-material": "translucent", 
            "--xr-back": 25,
            "--xr-scene": "carousel-strip",
            "--xr-width": 1200,
            "--xr-corner-radius": 20,
            "--xr-opacity": 0.9
          })}
        >
          <div className={cn("absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l")}></div>
          
          {/* Spatial cards container with staggered depths */}
          <div 
            className={cn("flex flex-row justify-start gap-4 pl-4", "max-w-7xl mx-auto")}
            enable-xr
            style={xr({
              "--xr-layout": "horizontal",
              "--xr-spacing": 16
            })}
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
                    once: true 
                  } 
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
                enable-xr
                style={xr({
                  "--xr-back": 15 + (index * 3), // Progressive depth
                  "--xr-background-material": "transparent"
                })}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced spatial navigation controls */}
        <div 
          className="flex justify-end gap-2 mr-10"
          enable-xr
          style={xr({
            "--xr-back": 35,
            "--xr-background-material": "thin",
            "--xr-corner-radius": 25
          })}
        >
          <button 
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 hover:bg-gray-200 transition-colors" 
            onClick={scrollLeft} 
            disabled={!canScrollLeft}
            enable-xr
            style={xr({
              "--xr-back": 10,
              "--xr-background-material": "regular",
              "--xr-hover-back": 20
            })}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button 
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 hover:bg-gray-200 transition-colors" 
            onClick={scrollRight} 
            disabled={!canScrollRight}
            enable-xr
            style={xr({
              "--xr-back": 10,
              "--xr-background-material": "regular",
              "--xr-hover-back": 20
            })}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false }: { card: Card; index: number; layout?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
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
            {/* Enhanced spatial modal backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
              enable-xr
              style={xr({
                "--xr-background-material": "translucent",
                "--xr-back": 5,
                "--xr-opacity": 0.8
              })}
            />
            
            {/* Enhanced spatial modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative shadow-2xl"
              enable-xr
              style={xr({ 
                "--xr-background-material": "thick", 
                "--xr-back": 80,
                "--xr-width": 900,
                "--xr-corner-radius": 24,
                "--xr-border-glow": "rgba(255, 255, 255, 0.1)",
                "--xr-shadow-intensity": 0.3
              })}
            >
              {/* Enhanced close button */}
              <button 
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform" 
                onClick={handleClose}
                enable-xr
                style={xr({
                  "--xr-back": 15,
                  "--xr-background-material": "thick",
                  "--xr-hover-back": 25
                })}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              
              {/* Spatial content with depth layering */}
              <motion.p 
                layoutId={layout ? `category-${card.title}` : undefined} 
                className="text-base font-medium text-black dark:text-white"
                enable-xr
                style={xr({
                  "--xr-back": 10,
                  "--xr-background-material": "translucent"
                })}
              >
                {card.category}
              </motion.p>
              <motion.p 
                layoutId={layout ? `title-${card.title}` : undefined} 
                className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
                enable-xr
                style={xr({
                  "--xr-back": 20,
                  "--xr-background-material": "thin"
                })}
              >
                {card.title}
              </motion.p>
              <div 
                className="py-10"
                enable-xr
                style={xr({
                  "--xr-scene": "modal-content",
                  "--xr-back": 30
                })}
              >
                {card.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Enhanced spatial card with interactive effects */}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10 transition-transform duration-300 hover:scale-[1.02]"
        enable-xr
        style={xr({ 
          "--xr-background-material": "translucent", 
          "--xr-back": isHovered ? 35 : 25,
          "--xr-corner-radius": 24,
          "--xr-border-glow": isHovered ? "rgba(59, 130, 246, 0.4)" : "rgba(255, 255, 255, 0.1)",
          "--xr-hover-scale": 1.02,
          "--xr-shadow-intensity": isHovered ? 0.2 : 0.1
        })}
      >
        {/* Enhanced gradient overlay */}
        <div 
          className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none"
          enable-xr
          style={xr({
            "--xr-back": 5,
            "--xr-background-material": "translucent"
          })}
        />
        
        {/* Enhanced text content with spatial depth */}
        <div 
          className="relative z-40 p-8"
          enable-xr
          style={xr({
            "--xr-back": 15,
            "--xr-background-material": "thin"
          })}
        >
          <motion.p 
            layoutId={layout ? `category-${card.category}` : undefined} 
            className="text-white text-sm md:text-base font-medium font-sans text-left"
            enable-xr
            style={xr({
              "--xr-back": 8,
              "--xr-background-material": "translucent"
            })}
          >
            {card.category}
          </motion.p>
          <motion.p 
            layoutId={layout ? `title-${card.title}` : undefined} 
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
            enable-xr
            style={xr({
              "--xr-back": 12,
              "--xr-background-material": "regular"
            })}
          >
            {card.title}
          </motion.p>
        </div>
        
        {/* Enhanced image with spatial framing */}
        <div
          enable-xr
          className="absolute z-10 inset-0"
          style={xr({
            "--xr-back": -5,
            "--xr-background-material": "transparent"
          })}
        >
          <BlurImage 
            src={card.src} 
            alt={card.title} 
            fill 
            className="object-cover" 
          />
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
