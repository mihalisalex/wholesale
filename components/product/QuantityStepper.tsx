"use client";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  size?: "md" | "lg";
}

export function QuantityStepper({ value, onChange, min = 1, size = "md" }: QuantityStepperProps) {
  const buttonSize = size === "lg" ? "w-12 h-12 text-lg" : "w-11 h-11 sm:w-9 sm:h-9";

  return (
    <div className="inline-flex items-center gap-3 sm:gap-4 rounded-full border border-ink/15 px-2 py-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${buttonSize} rounded-full flex items-center justify-center active:bg-ink active:text-cream hover:bg-ink hover:text-cream transition-colors`}
        aria-label="Decrease package quantity"
      >
        −
      </button>
      <span className="w-6 text-center font-semibold text-base">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className={`${buttonSize} rounded-full flex items-center justify-center active:bg-ink active:text-cream hover:bg-ink hover:text-cream transition-colors`}
        aria-label="Increase package quantity"
      >
        +
      </button>
    </div>
  );
}
