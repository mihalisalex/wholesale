import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site.config";

interface OrderConfirmationProps {
  invoiceNumber?: string;
  message: string;
  isError?: boolean;
  onClose: () => void;
}

export function OrderConfirmation({ invoiceNumber, message, isError, onClose }: OrderConfirmationProps) {
  return (
    <div className="text-center py-6 space-y-5">
      <div
        className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
          isError ? "bg-accent-3/10 text-accent-3" : "bg-accent-2/10 text-accent-2"
        }`}
      >
        {isError ? "!" : "✓"}
      </div>
      <div>
        <h3 className="font-serif text-xl font-semibold">
          {isError ? "We couldn't send that automatically" : "Request received"}
        </h3>
        {invoiceNumber && !isError && <p className="text-sm text-ink/50 mt-1">Reference {invoiceNumber}</p>}
      </div>
      <p className="text-sm text-ink/60 max-w-sm mx-auto">{message}</p>
      {isError && (
        <p className="text-sm text-ink/60">
          You can also reach us directly at{" "}
          <a href={`mailto:${siteConfig.company.email}`} className="text-gold underline">
            {siteConfig.company.email}
          </a>
          .
        </p>
      )}
      <Button onClick={onClose} className="mt-2">
        Close
      </Button>
    </div>
  );
}
