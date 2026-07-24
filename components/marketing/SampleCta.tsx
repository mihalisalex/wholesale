import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { GhostMark } from "@/components/ui/GhostMark";
import { buildWhatsAppLink } from "@/lib/contact";

export function SampleCta() {
  return (
    <section className="pt-16 md:pt-24 pb-20 md:pb-28">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <GlassPanel className="px-8 py-16 md:px-16 md:py-24 text-center">
            <div className="blob w-[360px] h-[360px] bg-gold -top-[140px] -left-[90px]" />
            <div className="blob w-[320px] h-[320px] bg-accent-2 -bottom-[140px] -right-[70px]" />
            <div className="blob w-[220px] h-[220px] bg-accent-3 top-[40%] left-[42%] opacity-35" />
            <GhostMark
              className="inset-0 flex items-center justify-center"
              size="clamp(260px, 34vw, 440px)"
              opacity={0.045}
            />
            <div className="relative z-10 max-w-xl mx-auto">
              <p className="text-[0.78rem] uppercase tracking-[0.14em] font-bold text-accent-3 mb-3.5">Ready When You Are</p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-5 text-balance">Ready to scale your footwear business?</h2>
              <p className="text-ink/60 mb-9">
                Add 8-pair packages to your cart as you browse, then request a Pro Forma Invoice whenever you&rsquo;re ready
                — no commitment until you confirm by bank transfer.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/catalog">Browse the Catalog</Button>
                <Button href={buildWhatsAppLink("Hi, I'd like to talk to your wholesale team.")} variant="ghost">
                  Talk to Sales
                </Button>
              </div>
            </div>
          </GlassPanel>
        </Reveal>
      </div>
    </section>
  );
}
