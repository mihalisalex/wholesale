"use client";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: { button: "w-8 h-8 text-sm", gap: "gap-2", padding: "px-1.5 py-1.5", valueWidth: "w-5 text-sm" },
  md: { button: "w-11 h-11 sm:w-9 sm:h-9", gap: "gap-3 sm:gap-4", padding: "px-2 py-2", valueWidth: "w-6 text-base" },
  lg: { button: "w-12 h-12 text-lg", gap: "gap-3 sm:gap-4", padding: "px-2 py-2", valueWidth: "w-6 text-base" },
};

export function QuantityStepper({ value, onChange, min = 1, size = "md" }: QuantityStepperProps) {
  const { button: buttonSize, gap, padding, valueWidth } = SIZES[size];

  return (
    <div className={`inline-flex items-center ${gap} rounded-full border border-ink/15 ${padding}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${buttonSize} rounded-full flex items-center justify-center active:bg-ink active:text-cream hover:bg-ink hover:text-cream transition-colors`}
        aria-label="Decrease package quantity"
      >
        −
      </button>
      <span className={`text-center font-semibold ${valueWidth}`}>{value}</span>
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
