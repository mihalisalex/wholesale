"use client";

import { useRef, useState } from "react";
import { ProductThumb } from "@/components/product/ProductThumb";
import type { ProductImage } from "@/types/product";

interface GalleryProps {
  images: ProductImage[];
  colorHex: string;
}

export function Gallery({ images, colorHex }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<{ transformOrigin: string; transform: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const active = images[activeIndex] ?? images[0];

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: "scale(1.6)" });
  }

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== activeIndex) setActiveIndex(index);
  }

  return (
    <div>
      {/* Mobile: horizontal swipe/scroll-snap gallery — hover-zoom doesn't translate to touch. */}
      <div className="md:hidden">
        <div onScroll={handleScroll} className="flex overflow-x-auto snap-x snap-mandatory rounded-brand border border-ink/10">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative shrink-0 w-full aspect-square snap-center overflow-hidden flex items-center justify-center"
              style={{ background: `linear-gradient(160deg, ${colorHex}18, #fff)` }}
            >
              <ProductThumb image={img} sizes="100vw" imgClassName="w-full h-full object-cover" fallbackClassName="w-2/3 h-2/3 text-ink" />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {images.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full ${i === activeIndex ? "bg-ink" : "bg-ink/20"}`} />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: hover-to-zoom gallery with thumbnail rail. */}
      <div className="hidden md:block">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setZoomStyle(null)}
          className="relative overflow-hidden rounded-brand border border-ink/10 aspect-square flex items-center justify-center cursor-zoom-in"
          style={{ background: `linear-gradient(160deg, ${colorHex}18, #fff)` }}
        >
          <ProductThumb
            image={active}
            sizes="(max-width: 1024px) 100vw, 50vw"
            imgClassName="w-full h-full object-cover transition-transform duration-300 ease-out"
            fallbackClassName="w-2/3 h-2/3 text-ink transition-transform duration-300 ease-out"
            style={zoomStyle ?? undefined}
          />
        </div>

        {images.length > 1 && (
          <div className="flex gap-3 mt-4">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={img.alt}
                className={`relative w-16 h-16 rounded-brand-sm border overflow-hidden flex items-center justify-center p-3 transition-colors ${
                  i === activeIndex ? "border-gold" : "border-ink/10"
                }`}
                style={{ background: `linear-gradient(160deg, ${colorHex}14, #fff)` }}
              >
                <ProductThumb image={img} imgClassName="w-full h-full object-cover" fallbackClassName="w-full h-full text-ink" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
