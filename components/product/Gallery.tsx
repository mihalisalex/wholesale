"use client";

import { useRef, useState } from "react";
import { ProductLineArt, type ProductArtKey } from "@/components/icons/ProductLineArt";
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

  return (
    <div>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomStyle(null)}
        className="relative overflow-hidden rounded-brand border border-ink/10 aspect-square flex items-center justify-center cursor-zoom-in"
        style={{ background: `linear-gradient(160deg, ${colorHex}18, #fff)` }}
      >
        <ProductLineArt
          art={active.art as ProductArtKey}
          className="w-2/3 h-2/3 text-ink transition-transform duration-300 ease-out"
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
              className={`w-16 h-16 rounded-brand-sm border flex items-center justify-center p-3 transition-colors ${
                i === activeIndex ? "border-gold" : "border-ink/10"
              }`}
              style={{ background: `linear-gradient(160deg, ${colorHex}14, #fff)` }}
            >
              <ProductLineArt art={img.art as ProductArtKey} className="w-full h-full text-ink" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
