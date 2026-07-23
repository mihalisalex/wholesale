export type ProductArtKey =
  | "oxford"
  | "chelsea"
  | "penny"
  | "court"
  | "stiletto"
  | "ballet"
  | "ankle"
  | "strappy";

const PATHS: Record<ProductArtKey, React.ReactNode> = {
  oxford: (
    <>
      <path
        d="M25 115 C25 95 45 85 65 84 C82 83 90 70 108 63 C130 55 155 60 168 72 C178 81 180 95 172 103 C168 108 160 110 150 110 L40 110 C30 110 25 112 25 115Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M65 84 C72 76 82 70 92 66" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.6" />
      <path d="M95 68l6 8M108 63l6 9M120 60l6 9" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </>
  ),
  chelsea: (
    <>
      <path
        d="M35 118 L35 68 C35 55 46 48 58 50 L100 58 C112 60 112 72 126 72 L172 72 C185 72 190 86 182 100 C177 109 166 112 155 112 L45 112 C38 112 35 115 35 118Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M100 58 C100 66 96 72 90 76" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.6" />
    </>
  ),
  penny: (
    <>
      <path
        d="M28 108 C28 90 48 82 64 82 C83 82 91 66 112 60 C138 53 165 62 176 80 C184 94 178 110 158 110Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect x="66" y="76" width="16" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
    </>
  ),
  court: (
    <>
      <path
        d="M22 108 C22 88 40 78 58 76 C78 74 86 60 108 54 C132 47 158 53 170 66 C180 76 186 92 178 102 C172 109 160 110 148 110Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M58 76 C66 68 78 62 90 58 M96 60l5 8 M112 55l5 9" stroke="currentColor" strokeWidth="1.1" opacity="0.6" />
    </>
  ),
  stiletto: (
    <>
      <path
        d="M22 100 C22 84 38 76 52 74 C70 71 82 58 100 50 C118 43 132 46 138 55 C142 62 138 70 128 72 L120 72 L118 100Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M118 100 L124 100 L120 132 L115 132Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </>
  ),
  ballet: (
    <>
      <path
        d="M24 105 C24 88 42 80 58 80 C76 80 86 66 105 60 C126 53 148 60 156 74 C161 84 156 96 142 98Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M52 79 q-7 -5 0 -10 q7 5 0 10Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    </>
  ),
  ankle: (
    <>
      <path
        d="M40 112 L40 62 C40 52 48 46 58 48 L92 55 C102 57 100 68 112 68 L134 68 L132 100 L124 100Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M124 100 L130 100 L126 130 L120 130Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M40 112 L124 112" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  strappy: (
    <>
      <path d="M20 105 L140 105" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M30 105 C34 90 40 80 50 74 M55 105 C58 88 64 76 74 68 M82 105 C84 86 90 72 100 62"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M132 105 L138 105 L134 132 L128 132Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </>
  ),
};

interface ProductLineArtProps {
  art: ProductArtKey;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Placeholder gallery imagery — stylized line-art matching the brand's
 * existing minimalist icon set. Swap for real product photography by
 * replacing `Product.images` entries and updating ProductGallery/ProductCard
 * to render <img> instead of this component.
 */
export function ProductLineArt({ art, className, style }: ProductLineArtProps) {
  return (
    <svg viewBox="0 0 220 150" className={className} style={style} aria-hidden="true">
      {PATHS[art]}
    </svg>
  );
}
