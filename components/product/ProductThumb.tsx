import Image from "next/image";
import { ProductLineArt, type ProductArtKey } from "@/components/icons/ProductLineArt";
import type { ProductImage } from "@/types/product";

interface ProductThumbProps {
  image: ProductImage | undefined;
  /** Applied to the <img> when a real photo is present */
  imgClassName?: string;
  /** Applied to the ProductLineArt fallback when no photo is set */
  fallbackClassName?: string;
  /** Applied to whichever element renders (e.g. a hover-zoom transform) */
  style?: React.CSSProperties;
  /** Passed through to next/image; defaults to a small-thumbnail hint */
  sizes?: string;
}

/**
 * Renders a product's real placeholder photo when available, falling back to
 * the abstract ProductLineArt icon for any product an admin hasn't set a
 * photoUrl for yet. Callers must render this inside a `position: relative`
 * container (next/image `fill` requirement).
 */
export function ProductThumb({ image, imgClassName, fallbackClassName, style, sizes = "200px" }: ProductThumbProps) {
  if (!image) return null;
  if (image.photoUrl) {
    return (
      <Image
        src={image.photoUrl}
        alt={image.alt}
        fill
        sizes={sizes}
        className={imgClassName}
        style={style}
      />
    );
  }
  return <ProductLineArt art={image.art as ProductArtKey} className={fallbackClassName} style={style} />;
}
