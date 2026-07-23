"use client";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export function QuantityStepper({ value, onChange, min = 1 }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center gap-4 rounded-full border border-ink/15 px-2 py-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-ink hover:text-cream transition-colors"
        aria-label="Decrease package quantity"
      >
        −
      </button>
      <span className="w-6 text-center font-semibold">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-ink hover:text-cream transition-colors"
        aria-label="Increase package quantity"
      >
        +
      </button>
    </div>
  );
}
